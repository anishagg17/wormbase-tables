// import React from "react";
import styled from "styled-components";
import _TextField from "@material-ui/core/TextField";
import {
  WhatsappShareButton as _WhatsappShareButton,
  WhatsappIcon as _WhatsappIcon,
  LinkedinShareButton as _LinkedinShareButton,
  LinkedinIcon as _LinkedinIcon,
} from "react-share";

export const Flex = styled.div`
  widht: 90vw;
  padding: 3vh 3vw 3vh 0vw;
  display: flex;
  background-color: #333333;
  justify-content: space-between;
`;

export const Stabel = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  jusfify-content: flex-start;
  background-color: #424242;
  color: #fff;
  margin: 70px;
  height: fit-content;
`;

export const Table = styled.div`
  flex: 2;

  background-color: #424242;
  color: #fff;
`;

export const PaginationContainer = styled.div`
  color: white;
  * {
    color: white !important;
  }
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  height: 8vh;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 10px;
  button {
    margin-left: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    :focus {
      outline: none;
      border: none;
    }
  }
`;

export const Id = styled.div`
  margin: 0px 2vw;
  width: 25%;
`;

export const Desc = styled.div``;

export const TextField = styled(_TextField)`
  * {
    color: white !important;
  }
`;

export const ShareRow = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  padding: 10px;
  * {
    margin-right: 10px;
  }
`;

const WhatsappShareButton = styled(_WhatsappShareButton)``;

const WhatsappIcon = styled(_WhatsappIcon)`
  border-radius: 50%;
`;

const LinkedinShareButton = styled(_LinkedinShareButton)``;

const LinkedinIcon = styled(_LinkedinIcon)`
  border-radius: 50%;
`;

export { WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon };
