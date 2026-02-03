#!/usr/bin/env python3
import re
import os
from pathlib import Path

# List of files to convert
test_files = [
    "packages/center/__tests__/center.test.tsx",
    "packages/column-drop/__tests__/column-drop.test.tsx",
    "packages/columns/__tests__/columns.test.tsx",
    "packages/cover/__tests__/cover.test.tsx",
    "packages/frame/__tests__/frame.test.tsx",
    "packages/grid/__tests__/grid.test.tsx",
    "packages/inline-cluster/__tests__/inlineCluster.test.tsx",
    "packages/inline/__tests__/inline.test.tsx",
    "packages/reel/__tests__/reel.test.tsx",
    "packages/split/__tests__/split.test.tsx",
    "packages/stack/__tests__/stack.test.tsx",
]

base_path = "/Users/traviswaith-mair/Bedrock"
successfully_converted = []
failed_conversions = []

for file_path in test_files:
    full_path = os.path.join(base_path, file_path)
    
    try:
        # Read the file
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Replace import statement
        content = re.sub(
            r'import\s+{\s*create\s+}\s+from\s+"react-test-renderer";',
            'import { render } from "@testing-library/react";',
            content
        )
        
        # 2. Replace initialization pattern
        # Pattern: const <varName> = create(<Component>);
        # Replace with: const { container } = render(<Component>);
        content = re.sub(
            r'const\s+(\w+)\s*=\s*create\s*\(',
            r'const { container } = render(',
            content
        )
        
        # 3. Replace assertions
        # Pattern: expect(<varName>.toJSON()).toMatchSnapshot()
        # Replace with: expect(container).toMatchSnapshot()
        content = re.sub(
            r'expect\s*\(\s*\w+\.toJSON\s*\(\s*\)\s*\)\.toMatchSnapshot\s*\(\s*\)',
            'expect(container).toMatchSnapshot()',
            content
        )
        
        # Write the file back
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        if content != original_content:
            successfully_converted.append(file_path)
            print(f"✓ Converted: {file_path}")
        else:
            print(f"⚠ No changes needed: {file_path}")
            
    except Exception as e:
        failed_conversions.append((file_path, str(e)))
        print(f"✗ Failed: {file_path} - {e}")

print("\n" + "="*60)
print(f"Successfully converted: {len(successfully_converted)} files")
for f in successfully_converted:
    print(f"  - {f}")

if failed_conversions:
    print(f"\nFailed conversions: {len(failed_conversions)} files")
    for f, err in failed_conversions:
        print(f"  - {f}: {err}")
