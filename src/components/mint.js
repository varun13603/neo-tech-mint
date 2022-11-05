/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import mintGif from "../assets/images/mint.gif";
import trxRed from "../assets/images/trx-red.svg";
import abi from "../abi/abi.json";
import { contractAddress } from "../connector";
import TxModal from "./transaction-modal";

export default function Mint() {
  const [mints, setMints] = useState(1);
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(undefined);
  const [balanceTRX, setBalanceTRX] = useState(0);
  const [salePrice, setSalePrice] = useState(7700);
  const [preSalePrice, setPreSalePrice] = useState(5100);
  const [saleStart, setSaleStart] = useState(0);
  const [presaleStart, setPresaleStart] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [total, setTotal] = useState(0);
  const [balanceNFT, setBalanceNFT] = useState(0);
  const [showTxModal, setShowTxModal] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);
  const [txError, setTxError] = useState(false);
  const [txEvent, setTxEvent] = useState(undefined);
  const [txErrObj, setTxErrObj] = useState(undefined);
  useEffect(() => {
    getWalletAddress();
  }, []);
  useEffect(() => {
    if (address !== "") {
      getBalance();
      getContract();
    }
  }, [address]);

  useEffect(() => {
    if (contract) {
      getMetaDetails();
    }
  }, [contract]);

  const getMetaDetails = async () => {
    try {
      const salePrice = await contract.methods.getMintPrice().call();
      console.log(
        "Sale Price",
        window.tronWeb.fromSun(window.tronWeb.toDecimal(salePrice))
      );
      setSalePrice(window.tronWeb.fromSun(window.tronWeb.toDecimal(salePrice)));

      const preSalePrice = await contract.methods.getPresaleMintPrice().call();
      console.log(
        "PreSale Price",
        window.tronWeb.fromSun(window.tronWeb.toDecimal(preSalePrice))
      );
      setPreSalePrice(
        window.tronWeb.fromSun(window.tronWeb.toDecimal(preSalePrice))
      );

      const saleStartTime = await contract.methods.getMintStartTime().call();
      console.log("Sale Start Time", window.tronWeb.toDecimal(saleStartTime));
      setSaleStart(window.tronWeb.toDecimal(saleStartTime));

      const presaleStartTime = await contract.methods
        .getPresaleMintStartTime()
        .call();
      console.log(
        "Presale Sale Start Time",
        window.tronWeb.toDecimal(presaleStartTime)
      );
      setPresaleStart(window.tronWeb.toDecimal(presaleStartTime));

      const total = await contract.methods.totalSupply().call();
      console.log("Total Supply", window.tronWeb.toDecimal(total));
      setTotalSupply(window.tronWeb.toDecimal(total));

      const isVip = await contract.methods.addressInWhitelist(address).call();
      console.log("isWhitelisted", isVip);
      setIsWhitelisted(isVip);

      const balNFT = await contract.methods.balanceOf(address).call();
      console.log("NFT Balance", window.tronWeb.toDecimal(balNFT));
      setBalanceNFT(window.tronWeb.toDecimal(balNFT));
    } catch (e) {
      console.log(e);
    }
  };

  const getWalletAddress = async () => {
    try {
        console.log("Called")
      if (window.tronLink) {
        if (window.tronLink.tronWeb) {
            console.log("Called2")
          const x = await window.tronLink.request({
            method: "tron_requestAccounts",
          });
          if (x.code === 200) {
            setAddress(window.tronWeb.defaultAddress.base58);
            getBalance();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getContract = async () => {
    try {
      const nftContract = window.tronWeb.contract(abi, contractAddress);
      setContract(nftContract);
      console.log("Contract", nftContract);
    } catch (e) {
      console.log(e);
    }
  };
  const getBalance = async () => {
    try {
      const x = await window.tronWeb.trx.getBalance(address);
      console.log("Balance", window.tronWeb.fromSun(x));
      setBalanceTRX(window.tronWeb.fromSun(x));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mints > 0) {
      const time = Math.floor(new Date().getTime() / 1000);
      if (time > saleStart || time < presaleStart) {
        // general sale price
        setTotal(mints * salePrice);
      } else if (time > presaleStart && time < saleStart && isWhitelisted) {
        
          setTotal(mints * preSalePrice);
        
      } else {
        setTotal(mints * salePrice);
      }
    }
  }, [mints, presaleStart, saleStart, salePrice, preSalePrice, isWhitelisted]);
  const spinMints = (dir) => {
    if (dir === "+") {
      if (mints < 10) setMints(mints + 1);
    }
    if (dir === "-") {
      if (mints > 1) setMints(mints - 1);
    }
  };

  const linkTronLink = async () => {
    if (window.tronLink) {
      if (window.tronLink.tronWeb) {
        const x = await window.tronLink.request({
          method: "tron_requestAccounts",
        });
        if (x.code === 200) {
          setAddress(window.tronWeb.defaultAddress.base58);
        }
      } else if (!window.tronLink.ready) {
        const x = await window.tronLink.request({
          method: "tron_requestAccounts",
        });
        if (x.code === 200) {
          setAddress(window.tronWeb.defaultAddress.base58);
        }
      } else {
        alert("Please Unlock/Install TronnLink wallet.");
      }
    } else {
      alert("Please install TronLink wallet!");
    }
  };

  const executeSale = async () => {
    try {
      console.log(window.tronWeb.toSun(total));
      setShowTxModal(true);
      contract.Transfer().watch((err, eventResult) => {
        if (err) {
          return console.error('Error with "method" event:', err);
        }
        if (eventResult) {
          console.log("eventResult:", eventResult);
          setTxEvent(eventResult);
        }
      });
      contract.methods
        .mint(mints)
        .send({
          from: address,
          callValue: window.tronWeb.toSun(total),
          shouldPollResponse: true,
        })
        .then((res) => {
          console.log("result", res);
          setTxSuccess(true);
        })
        .catch((err) => {
            if(err === "Confirmation declined by user"){
                setTxError(true);
                setTxErrObj({
                    output:{
                        contractResult:[window.tronWeb.toHex("Confirmation declined by user")]
                    }
                })
            }else{
                console.log(
                    "err",
                    window.tronWeb.toAscii(err.output.contractResult[0]).toString()
                  );
                  setTxError(true);
                  setTxErrObj(err);
                
            }
          });
    } catch (err) {
      console.log(
        "err",
        window.tronWeb.toAscii(err.output.contractResult[0]).toString()
      );
    }
  };

  const executePresale = async () =>{
    try {
        console.log(window.tronWeb.toSun(total));
        setShowTxModal(true);
        contract.Transfer().watch((err, eventResult) => {
          if (err) {
            return console.error('Error with "method" event:', err);
          }
          if (eventResult) {
            console.log("eventResult:", eventResult);
            setTxEvent(eventResult);
          }
        });
        contract.methods
          .presaleMint(mints)
          .send({
            from: address,
            callValue: window.tronWeb.toSun(total),
            shouldPollResponse: true,
          })
          .then((res) => {
            console.log("result", res);
            setTxSuccess(true);
          })
          .catch((err) => {
              if(err === "Confirmation declined by user"){
                  setTxError(true);
                  setTxErrObj({
                      output:{
                          contractResult:[window.tronWeb.toHex("Confirmation declined by user")]
                      }
                  })
              }else{
                  console.log(
                      "err",
                      window.tronWeb.toAscii(err.output.contractResult[0]).toString()
                    );
                    setTxError(true);
                    setTxErrObj(err);
                  
              }
            });
      } catch (err) {
        console.log(
          "err",
          window.tronWeb.toAscii(err.output.contractResult[0]).toString()
        );
      }
  }
  const handleMint = () => {
    const time = Math.floor(new Date().getTime() / 1000);
    if (isWhitelisted && time >= presaleStart && time < saleStart) {
      //Presale
      executePresale();
    } else {
      //Sale
      executeSale();
    }
  };

  const closeTxModal = () => {
    console.log("hit");
    setShowTxModal(false);
    setTxSuccess(false);
    setTxErrObj(undefined);
    setTxError(false);
    setTxEvent(undefined);
  };
  return (
    <div className="mint-root" id="mint">
      <Container>
        <Row>
          <Col className="mintHead" lg={12} md={12} sm={12}>
            <h3>Mint NeoTech Genesis NFT</h3>
            <span>Enter how many NFTs you would like to mint</span>
          </Col>
        </Row>
        <Row className="mint-box">
          <Col className="m-left" lg={6} md={6} sm={12}>
            <img src={mintGif} alt="Mint Gif" />
          </Col>
          <Col className="m-right" lg={6} md={6} sm={12}>
            <h4 className="t-mints">Total Mints: {totalSupply}/1000</h4>
            <div className="m-right-cont">
              <div>
                <span>Whitelist Sale:</span>
                <p className="m-price">
                  <img src={trxRed} width={25} alt="TRX logo" />
                  <b>
                    {preSalePrice !== 0 ? `${preSalePrice} TRX` : " 5100 TRX"}
                  </b>
                </p>
              </div>
              <div>
                <span>General Sale:</span>
                <p className="m-price">
                  <img src={trxRed} width={25} alt="TRX logo" />
                  <b>{salePrice !== 0 ? `${salePrice} TRX` : " 7700 TRX"}</b>
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="m-select">
          <Col lg={6} md={6} sm={6}>
            <div className="m-spinner">
              <button onClick={() => spinMints("-")}>-</button>

              <span>{mints}</span>
              <button onClick={() => spinMints("+")}>+</button>
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
              textAlign: "right"
            }}
            lg={6}
            md={6}
            sm={6}
          >
            <h3 style={{ marginRight: "16px" }}>10 Max</h3>
          </Col>
        </Row>
        <Row className="m-total">
          <Col className="total-col" lg={12} sm={12} md={12}>
            <div>
              <h3>Total Price:</h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <h3>
                <strong>{total} TRX</strong>
                <img src={trxRed} alt="TRX logo" />
              </h3>
            </div>
          </Col>
        </Row>
        {address !== "" && (
          <Row className="m-total">
            <Col className="total-col" lg={12} sm={12} md={12}>
              <div>
                <span>
                  Wallet Address: {address} &nbsp;
                  {isWhitelisted && <Badge bg="success">Whitelisted</Badge>}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <h3>
                  <strong>{balanceTRX} TRX</strong>
                  <img src={trxRed} alt="TRX logo" />
                </h3>
              </div>
            </Col>
          </Row>
        )}
        <Row style={{ marginTop: "30px" }}>
          {address === "" && (
            <button className="link-btn" onClick={linkTronLink}>
              Link your TronLink Wallet
            </button>
          )}
          {address !== "" && (
            <button onClick={handleMint} className="link-btn">
              Mint NeoTech NFTs
            </button>
          )}
        </Row>
      </Container>
      <TxModal
        showTxModal={showTxModal}
        txSuccess={txSuccess}
        txError={txError}
        errObj={txErrObj}
        txEvent={txEvent}
        handleClose={closeTxModal}
      />
    </div>
  );
}
