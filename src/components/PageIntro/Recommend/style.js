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
    background-color: ${lightGrey};
    margin-top: 8vh;
    // margin-bottom: 3vw;
    // padding-left: 5vw;
    // margin: 0vw 0vw 5vw 0vw;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        font-size: 1.5em;
    }

    div {
        height: 100%;
        background-color: white;
    }

    div > span {
        display: inline-block;
        height: 100%;
        background-color: ${lightGrey};
        border-radius: 1em 1em 0 0;
        padding: .5em;
    }

    &::before {
        content: '';
        height: 100%;
        width: 5vw;
        background-color: white;
        border-radius: 0 0 1em 0;
        // top-left, top-right, bottom-right, bottom-left
        // box-shadow: 0 0 0 .414em magenta;
        overflow:hidden;
    }

    &::after {
        content: '';
        background-color: white;
        height: 100%;
        flex-grow: 1;
        border-radius: 0 0 0 1em;
    }
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
    
    // background:
	// repeating-linear-gradient(
	// 	45deg,
	// 	transparent,
	// 	transparent 2em,
    //     rgba(255, 228, 181, 0.5) 0,
    //     rgba(255, 228, 181, 0.5) 4em,
	// 	transparent 0,
	// 	transparent 5em,
    //     rgba(173, 216, 230, 0.5) 0,
    //     rgba(173, 216, 230, 0.5) 8em,
	// 	transparent 0,
	// 	transparent 9em,
    //     rgba(230, 230, 250, 0.5) 0,
    //     rgba(230, 230, 250, 0.5) 12em,
	// ),
	// // repeating-linear-gradient(
	// // 	-45deg,
	// // 	transparent,
	// // 	transparent 1em,
	// // 	khaki 0,
	// // 	khaki 2em,
	// // 	transparent 0,
	// // 	transparent 3em,
	// // 	beige 0,
	// // 	beige 4em,
	// // 	transparent 0,
	// // 	transparent 5em,
	// // 	peachpuff 0,
	// // 	peachpuff 6em
	// // ),
    // whitesmoke;

    // background-blend-mode: multiply;
`;

export const Item = styled.div`
    margin-top: 2em;
    // align-items: stretch;
    // height: 30vh;
    // width: 47%;
    padding: .5em;
    gap: .3em;
    width: 47%;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        width: 97%;
    }
    padding-left: .5em;
    padding-right: .5em;
    // 这里使用媒体查询，更合适，当视口很窄时，最好展示一列而不是两列
    background-color: white;
    border-radius: .5em;
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
    font-weight: bold;
    // color: #4d4b4b;
    // text-align: left;
    // padding-left: 1em;
    align-self: left;
    padding-left: .5em;

    &:hover {
        color: ${theme.colors.dark_grey};
        cursor: pointer;
    }
`;

export const ItemImagesContainer = styled.div`
    display: flex;
    width: 100%;
    // max-width:100%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: auto;
    margin-top: 10px;
    margin-bottom: .3em;
    // max-height: 50px;
    gap: 3px;
    .item-single-image-container {
        flex: 0 1 47%;
        &:nth-child(1) {
            flex: 40%;
        }
        height: auto;
        // object-fit: cover;
        border-radius: 3px;
        border: ${theme.colors.border_grey} solid .5px;
        padding: 3px;
        img {
            max-width: 100%;
            // max-height: 100%;
            max-height: 200px;
            object-fit: cover;
        }
    }
`;

export const ItemAuthorContainer = styled.div`
    display: flex;
    height: 1.6em;
    padding-left: .5em;
    gap: 8px;
    // margin-top: .3em;
    align-items: center;
    .item-author-avatar-container {
        border-radius: 50%;
        height: 70%;
        aspect-ratio: 1/1;
        overflow: hidden;
        border: 1px solid ${theme.colors.clay_blue};
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    span {
        display: inline-block;
        font-size: .9em;
        &:hover{
            color: ${theme.colors.dark_grey};
            cursor: pointer;
        }
    }
`;

export const ItemAuthor = styled.span`
    // background-color: yellow;
    // color: blue;
    text-align: left;
    padding-left: .5em;
    text-decoration: underline;
    
    &:hover {
        // color: ${lightBlue};
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
    }
`;

export const ItemContent = styled.div`
    display: -webkit-box;
    // background-color: white;
    flex-grow: 1;
    -webkit-line-clamp: 6;
    max-width: calc(100% - 5px);
    max-height: 7.2em;
    line-height: 1.2em;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    // margin-top: .3em;
    padding-left: .5em;
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
    // padding: 0vw 5vw 0vw 5vw;
    // top, right, buttom, left
`;