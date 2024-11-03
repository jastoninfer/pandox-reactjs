import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const Back2top = styled.div`
    cursor: pointer;
    width: 4rem;
    position: relative;

    color: #d4d4d4;

    text-align: center;

    i {
        display: block;
        font-size: 1.5rem;
        height: 3rem;
        width: 2rem;
        line-height: 3rem;
        margin-left: auto;
    }

    &::after {
        content: 'Back to Top';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 0.9rem;
        height: 3rem;
        line-height: 1.2rem;
        padding: 0.3rem;
        font-weight: bold;
        background-color: ${theme.colors.grey_white};
        color: ${theme.colors.burlywood};
        border-radius: 5px;
        display: none;
        z-index: 555;
    }
    
    &:hover {
        &::after {
            display: block;
        }
        i {
            visibility: hidden;
        }
    }
`;
