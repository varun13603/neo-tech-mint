import React from "react";
import { Modal, Button } from "react-bootstrap";
import { GridLoader } from "react-spinners";
import success from "../assets/images/success.gif";
import errorGif from "../assets/images/close.gif";

export default function TxModal(props) {
  const handleClose = () => {
    props.handleClose();
  };
  return (
    <div>
      <Modal
        show={props.showTxModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Transaction Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!props.txSuccess && !props.txError && (
            <>
              <GridLoader color="#7e2977" />
              <p>Waiting for Transaction Result</p>
            </>
          )}
          {props.txSuccess && (
            <>
              <img src={success} alt="success icon" />
              <h2>Mint Successful!</h2>
            </>
          )}
          {props.txError && props.errObj && (
            <>
              <img src={errorGif} alt="error icon" />
              <h2>Mint Failed!</h2>
                <span>{window.tronWeb.toAscii(props.errObj.output.contractResult[0]).toString()}</span>
            </>
          )}
          {props.txEvent && (
            <span>
              <a
                href={`https://nile.tronscan.org/#/transaction/${props.txEvent.transaction}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Tronscan
              </a>
            </span>
          )}
        </Modal.Body>
        {(props.txSuccess || props.txError) && (
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            {props.txSuccess && <button>My NFTs</button>}
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}
