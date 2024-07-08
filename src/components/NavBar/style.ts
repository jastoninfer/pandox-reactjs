import styled from 'styled-components';
import theme from '../../commons/style/theme';

interface NavBarProps {
  scrolllevel: number;
  displaytype: string|undefined;
}

export const NavBar = styled('div')<NavBarProps>(({scrolllevel, displaytype}) => (`
  background-color: ${(scrolllevel == 1 || (displaytype && displaytype==='secondary') ? '#ffffff' : 'rgba(0,0,0,.05)')};
  transition: background-color 0.3s ease, height 0.3s ease;
  position: fixed;
  top: 0;
  height: ${(scrolllevel > 0 || displaytype && displaytype==='secondary' ? '8vh' : '10vh')};
  border-bottom: ${(scrolllevel > 0 || (displaytype && displaytype==='secondary') ? '1.0px' : '0px')} solid #f0f0f0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .Nav-Bar-Logo {
    height: 80%;
    cursor: pointer;
    margin-left: 15px;
    /* height: 30px; */
  }
  #NavBarButtons {
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;
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
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 0.95em;
    gap: .3em;
    // margin: 50px 22px;
    //margin-top: 88px;
    top: calc(100% + 5px);
    right: -5px;
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
      right: 8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid ${theme.colors.grey_white};
      transform: translateX(-50%);
      // box-sizing: border-box;
    }

    .Login-Menu-Button{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // background-color: red;
      .Nav-Bar-Logout{
        // color: red;
      }
      // background-color: red;
      // margin-top: 10px;
      &:hover{
        // font-weight: bold;
      }
      // border-top: 1px solid #f0f0f0;
      z-index: 101;
      color: ${theme.colors.grey};
      div {
        width:100%;
        height: 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
  }

  .Nav-Bar-Icon {
    height: 80%;
  }
  
  #Nav-Bar-Button-Search{
    // color: ${theme.colors.dark_grey};
    &:hover{
      // background-color: rgba(191, 191, 191, .3);
      // font-size: 1.1em;
      font-weight: bold;
      // color: ${theme.colors.black};
    }
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      &::after {
        margin-left: 4px;
        content: 'Search';
        width: 3em;
      }
    }
  }

  #Nav-Bar-Button-NewPage{
    // color: ${theme.colors.dark_grey};
    &:hover{
      // background-color: rgba(191, 191, 191, .3);
      // font-size: 1.1em;
      font-weight: bold;
      // color: ${theme.colors.black};
    }
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      &::after {
        margin-left: 4px;
        content: 'New Page';
        width: 4.8em;
      }
    }
  }

  #Nav-Bar-Button-Signup{
    // color: red;
    &:hover{
      font-weight: bold;
    }
  }

  #Nav-Bar-Button-Menu{
    margin-right: 15px;
  }

  .Nav-Bar-Avatar-Container{
    height: 90%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${theme.colors.clay_blue};
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  z-index: 999;
`));

export const SearchBox = styled('div')`
    position: fixed;
    z-index: 101;
    top: 50%;
    left: 50%;
    width: 80vw;
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
      width: 500px;
    }
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
      gap: .2em;
      input {
        // background-color: red;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        height: 30px;
        border: none;
        border-bottom: 1px solid black;
        font-size: 1.1em;
        background-color: ${theme.colors.floralwhite};
        &:focus {
          outline: none;
          border-bottom: 2px solid black;
        }
      }
      button {
        // height: 2.5em;
        min-width: 50px;
        border: none;
        background: none;
        border-radius: 25px;
        background-color: ${theme.colors.green_blue};
        color: ${theme.colors.white};
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
      }
      .search-results-container{
        display: flex;
        flex-direction: column;
        .search-user-header{
          background-color: ${theme.colors.cadetblue};
        }
        .search-page-header{
          background-color: ${theme.colors.burlywood};
        }
        .search-page-header, .search-user-header {
          font-weight: bold;
          color: ${theme.colors.grey_white};
          padding: 3px;
        }
        .search-results-item{
          padding: 2px;
          cursor: pointer;
          &:hover{
            background-color: ${theme.colors.border_grey};
          }
        }
      }
    }
`;