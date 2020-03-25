import React from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';
import { Link } from 'docz';

const HomeLink = styled(Link)`
  color: inherit;
`;

const Brand = () => {
  return (
    <>
      <VisuallyHidden>Bedrock Layout Primitives Home</VisuallyHidden>
      <svg aria-hidden width='60px' height='42px' viewBox='0 0 400 244.224'>
        <g>
          <path
            fill='currentColor'
            fillRule='evenodd'
            stroke='none'
            d='M0 99.01v95.049h236.304v50.165H396.04V3.96H166.337v48.845h14.442l.37-16.831.369-16.832h199.34l.338 106.613.338 106.613-65.025-.342-65.024-.343-.342-68.977-.341-68.977h106.954V77.888H122.772V60.726h-14.521v17.162H46.205V93.729h190.099v85.809H14.501l.34-80.198.341-80.198H107.591l.402 6.271.402 6.27H122.772V3.96H0v95.05'
          ></path>
        </g>
      </svg>
    </>
  );
};

export const Logo = () => {
  return (
    <HomeLink to='/'>
      <Brand alt='Bedrock Layout Primitives Logo' />
    </HomeLink>
  );
};
