import styled from 'styled-components';
import theme from '../../../commons/style/theme';

const lightGrey = '#fafafa';
const lightBlue = 'rgba(10, 163, 245, 1.0)';

export const Test = styled.div`
    width: 1em;
    height: 1em;
    // background-color: yellow;
    box-shadow: 0 0 0 1em red;
`;

export const Header = styled.div`
    height: 10vh;
    display: flex;
    font-size: 1.8em;
    // font-weight: bold;
    text-align: left;
    align-items: center;
    margin-top: 8vh;
    

    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        font-size: 1.5em;
    }

    div {
        height: 100%;
    }

    div > span {
        display: inline-block;
        line-height:100%;
        height: 100%;

        border-radius: 1em 1em 0 0;
        padding: 0.5em;

        // font-size: 60px;
        font-weight: bold;
        background: linear-gradient(45deg, ${theme.colors.cadetblue}, #179499, ${theme.colors.clay_blue});
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        
    }

    &::before {
        content: '';
        height: 100%;
        width: 5vw;
        background-color: white;
        border-radius: 0 0 1em 0;
        // top-left, top-right, bottom-right, bottom-left
        // box-shadow: 0 0 0 .414em magenta;
        overflow: hidden;
    }

    &::after {
        content: '';
        background-color: white;
        height: 100%;
        flex-grow: 1;
        border-radius: 0 0 0 1em;
    }
`;

export const ItemsMultiColContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    min-height: 200px;
    padding-left: 5vw;
    padding-right: 5vw;
    padding-bottom: 2em;
`;

export const ItemSingleColContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    @media only screen and (max-width: ${theme.breakpoints.tablet}) {
        flex-basis: 80%;
    }
    align-items: flex-start;
`;

export const ItemsContainer = styled.div`
    background-color: ${lightGrey};
    display: flex;
    flex-wrap: wrap;
    min-height: 70vh;
    // flex-direction: column;
    // height: 2000px;
    justify-content: space-around;
    align-items: flex-start;
    // align-content: stretch;
    padding-left: 5vw;
    padding-right: 5vw;
    padding-bottom: 2em;
`;

export const Item = styled.div`
    margin-top: 2em;
    padding: 0.5em;
    gap: 0.3em;
    width: 94%;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        width: 97%;
    }
    padding-left: 0.5em;
    padding-right: 0.5em;
    // 这里使用媒体查询，更合适，当视口很窄时，最好展示一列而不是两列
    background-color: white;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ItemTitle = styled.a`
    // white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // background-color: white;
    padding: 0.2em;
    font-size: 1.2rem;
    font-weight: bold;
    align-self: left;
    padding-left: 0.5em;
    color: ${theme.colors.dark_grey};

    &:hover {
        color: black;
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const ItemImagesContainer = styled.div`
    display: flex;
    width: 100%;
    // max-width:100%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: auto;
    margin-top: 10px;
    margin-bottom: 0.3em;
    gap: 3px;
    .item-single-image-container {
        flex: 0 1 47%;
        &:nth-child(1) {
            flex: 40%;
        }
        max-height: 180px;
        max-width: 97%;
        text-align:center;
        line-height: 100%;
        border-radius: 6px;
        overflow: hidden;
        img {
            max-width: 100%;
            position: relative;
            object-fit: contain;
        }
    }
`;

export const ItemAuthorContainer = styled.div`
    display: flex;
    height: 1.6em;
    padding-left: 0.5em;
    gap: 8px;
    margin-top: .5rem;
    // margin-top: .3em;
    align-items: center;
    .item-author-avatar-container {
        border-radius: 50%;
        height: 80%;
        aspect-ratio: 1/1;
        overflow: hidden;
        border: 1px solid ${theme.colors.burlywood};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            &:hover{
                cursor:pointer;
            }
        }
    }
    span {
        display: inline-block;
        font-size: 0.9em;
        &:hover {
            color: ${theme.colors.dark_grey};
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;

export const ItemAuthor = styled.span`
    text-align: left;
    padding-left: 0.5em;
    text-decoration: none;

    &:hover {
        // color: ${lightBlue};
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const ItemContent = styled.div`
    display: -webkit-box;
    // background-color: white;
    flex-grow: 1;
    -webkit-line-clamp: 3;
    max-width: calc(100% - 5px);
    max-height: 7.2em;
    line-height: 1.2em;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    // margin-top: .3em;
    padding-left: 0.5em;
    // padding-right: .5em;
    text-align: left;
    color: #302e2e;
    cursor: default;
    font-size: 0.9em;
    &:hover {
        color: ${theme.colors.dark_grey};
        cursor: pointer;
    }
`;

export const StyledRecommend = styled.div`
    background-color: white;
`;
