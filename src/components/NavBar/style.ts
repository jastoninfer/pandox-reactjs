import styled from 'styled-components';
import theme from '../../commons/style/theme';

import { NavBarDisplayType, ScrollLevel } from 'enums/navbar.enum';

interface NavBarProps {
    displaytype: NavBarDisplayType | undefined;
    logged_in: string;
}

export const NavBar = styled('div')<NavBarProps>(
    ({ displaytype, logged_in }) => `
  background-color: ${
    displaytype !== NavBarDisplayType.SECONDARY && 'rgba(0,0,0,0)' || '#ffffff'
  };
  transition: background-color .7s ease, height .7s ease;
  position: fixed;
  top: 0;
  font-size: ${displaytype!==NavBarDisplayType.SECONDARY&&'1.1rem'||'1.0rem'};
  height: ${
    displaytype !== NavBarDisplayType.SECONDARY && '80px' || '60px'};
  border-bottom: ${
   displaytype !== NavBarDisplayType.SECONDARY && '0px' || '1.0px'
  } solid #f0f0f0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .Nav-Bar-Logo {
    height: 80%;
    cursor: pointer;
    margin-left: 15px;
    border-radius:30%;
  }
  .Nav-Bar-Extensions {
    height: 100%;
    flex-basis: 10rem;
    // wdith: 10px;
    flex-grow: 1;
    // background-color: green;
  }
  #NavBarButtons {
    flex-shrink: 0;
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${displaytype !==NavBarDisplayType.SECONDARY && 'white' || 'black'};
  }

  .Nav-Bar-Button {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin:3px 3px;
    height: 50%;
    padding: 2px 4px;
    cursor: pointer;
  }

  .Nav-Bar-Button > .Login-Menu{
    // z-index: 13;
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 0.95em;
    gap: .3em;
    top: calc(100% + 5px);
    right: 5px;
    background-color: ${theme.colors.grey_white};
    padding: 4px;
    padding-left: 10px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid #f0f0f0;
    // box-sizing: border-box;
    outline: 10px solid transparent;
    &::before{
      content: '';
      position: absolute;
      top: -6px;
      right: 3px;
      @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        right: ${logged_in==='true'&&'-2px' || 'calc(4rem - 5px)'};
      }
      transform: translateX(-50%);

      width: 10px;
      height: 8px;
      clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
      background-color: ${theme.colors.grey_white};
      
    }

    .Login-Menu-Button{
      // background-color: red;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // background-color: red;
      .Nav-Bar-Logout{
        // color: red;
        &:hover{
          color: ${theme.colors.warning_red}
        }
      }
      // background-color: red;
      // margin-top: 10px;
      &:hover{
        // font-weight: bold;
      }
      // border-top: 1px solid #f0f0f0;
      z-index: 21;
      color: ${theme.colors.grey};
      div {
        width:100%;
        height: 35px;
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        i{
          flex-basis: 30%;
          // margin-left: auto;
          text-align: left;
          padding-left: 2rem;
          // background-color: green;
          // align-self: center;
          // justify-self:center;
        }
        &:hover{
          background-color: #f0f0f0;
          color: ${theme.colors.black};
        }
      }
      div.login-menu-border {
        height: 1px;
        background-color: ${theme.colors.border_grey};
      }
      div.Login-Menu-Username{
        // width:100%;
        // height: 100%;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // justify-content: center;
        // border-bottom: 1px solid #f0f0f0;
        // margin-bottom: .5em;
        &:hover{
          // font-weight: bold;
          background-color: #f0f0f0;
        }
        // border-top: transparent;
        // background-color: green;
      }
    }
  }

  .overlay-dark{
    background-color: rgba(0, 0, 0, 0.5);
    // background-color: green;
  }

  .Nav-Bar-Icon {
    height: 80%;
  }

  #Nav-Bar-Button-Signup{
    i {
      // background-color: green;
      font-size: 1.1em;
    }
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      &:hover{
        font-weight: bold;
      }
      &::after {
        display: inline-block;
        margin-left: 4px;
        content: 'Sign up';
        width: 4rem;
        // background-color: green;
        text-align: center;
      }
    }
  }
  
  #Nav-Bar-Button-Search{
    // font-size: 1.1rem;
    i {
      // background-color: green;
      font-size: 1.1em;
    }

    // color: ${theme.colors.dark_grey};
    &:hover{
      // background-color: rgba(191, 191, 191, .3);
      // font-size: 1.1em;
      font-weight: bold;
      // color: ${theme.colors.black};
    }
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      &::after {
        display: inline-block;
        margin-left: 4px;
        content: 'Search';
        width: 4rem;
        // background-color: green;
        text-align: center;
      }
    }
  }

  #Nav-Bar-Button-NewPage{
    // color: ${theme.colors.dark_grey};
    // font-size: 1.1rem;
    i {
      // background-color: green;
      font-size: 1.1em;
    }
    &:hover{
      // background-color: rgba(191, 191, 191, .3);
      // font-size: 1.1em;
      font-weight: bold;
      // color: ${theme.colors.black};
    }
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      &::after {
        display: inline-block;
        margin-left: 4px;
        content: 'Write';
        width: 3rem;
        text-align: center;
        // background-color: green;
      }
    }
  }

  #Nav-Bar-Button-Menu{
    margin-right: 15px;
  }

  .Nav-Bar-Avatar-Container{
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${theme.colors.burlywood};
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  z-index: 10;
`
);

export const SearchBox = styled('div')`
    position: fixed;
    z-index: 101;
    top: 50%;
    left: 50%;
    width: 80vw;
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        width: 650px;
    }
    color: black;
    min-height: 300px;
    border-radius: 8px;
    background-color: ${theme.colors.floralwhite};
    transform: translate(-50%, -50%); /*居中*/
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 10px;
    div.input-search {
        display: flex;
        gap: 0.2em;
        input {
            // background-color: red;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            height: 30px;
            border: none;
            border-bottom: .5px solid ${theme.colors.dark_grey};
            font-size: 1.1em;
            background-color: ${theme.colors.floralwhite};
            &:focus {
                outline: none;
                border-bottom: 1px solid ${theme.colors.dark_grey};
            }
        }
        button {
            // height: 2.5em;
            min-width: 60px;
            border: none;
            background: none;
            border-radius: 15px;
            padding: 0;
            // border: 1px solid green;
            // font-weight: bold;
            // font-size: 1rem;
            background-color: ${theme.colors.green_blue};
            color: white;
            height: 2rem;
            &:hover {
                cursor: pointer;
                background-color: ${theme.colors.green_blue_dark};
            }
        }
    }
    .search-suggestions {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .search-suggestions-span {
            // background-color: green;
            font-style: italic;
            color: ${theme.colors.grey};
        }
        .search-results-container {
            display: flex;
            color: ${theme.colors.dark_grey};
            flex-direction: column;
            .search-user-header {
                background-color: ${theme.colors.cadetblue};
            }
            .search-page-header {
                background-color: ${theme.colors.burlywood};
            }
            .search-page-header,
            .search-user-header {
                font-weight: bold;
                color: ${theme.colors.grey_white};
                padding: 3px;
            }
            .search-results-item {
                padding: 2px;
                cursor: pointer;
                &:hover {
                    background-color: ${theme.colors.border_grey};
                }
            }
        }
    }
`;
