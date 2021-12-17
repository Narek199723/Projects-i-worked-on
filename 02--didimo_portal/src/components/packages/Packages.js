import React, { useEffect, useState, useContext, Fragment } from 'react';
// import { addState } from '../../components/BaseView';
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import appConfig from '../AppConfig';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SuccessSnack from '../SuccessSnack';
import ErrorSnack from '../ErrorSnack';
import queryString from 'query-string';
import Products from '../products/Products';
import { withRouter } from 'react-router-dom';
import { formatCurrency } from '../../helpers/formaters';
import axios from 'axios';
import { GlobalContext } from 'src/context/store';
import PackageTable from '../../pages/PackageTable/PackageTable';
import { getData, postData } from '../../helpers/dataFetching';

const Packages = (props) => {
  const [packagesLoaded, setPackagesLoaded] = useState(false);
  const [bucketData, setBucketData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [isBuying, setIsBuying] = useState(false);
  const [redirectToCheckout, setRedirectToCheckout] = useState(null);
  const [missingPoliciesMessage, setMissingPoliciesMessage] = useState(false);
  const [policyDecisions, setPolicyDecisions] = useState({});
  const [allPolicy, setAllPolicy] = useState({});
  const [currentTier, setCurrentTier] = useState({});
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);
  const state = useContext(GlobalContext);

  const credentials = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    (async () => {
      try {
        const accountPackageListSet = await getData(
          `${process.env.REACT_APP_API_ROOT}accounts/${credentials.accounts.uuid}/packages?status=active`,
          credentials.accessToken
        );
        setPackagesLoaded(true);
        setBucketData(accountPackageListSet);
        setLoadingProducts(true);

        const productList = await getData(
          `${process.env.REACT_APP_API_ROOT}services/payments/stripe/productList`,
          credentials.accessToken
        );

        const enterPrisePlan = {
          credits: '0',
          name: 'Enterprise',
          price: '0',
          uuid: 'SCoH5JB6Eeu3QQISVJZ/Tw==',
        };
        setLoadingProducts(true);
        setProductsLoaded(true);
        setProducts([...productList, enterPrisePlan]);

        const accountStatus = await getData(
          `${process.env.REACT_APP_API_ROOT}accounts/${credentials.accounts.uuid}/status`,
          credentials.accessToken
        );
        setCurrentTier(accountStatus, 'ACCOUNTSTATUS');

        const accounts = await getData(
          `${process.env.REACT_APP_API_ROOT}accounts/${credentials.accounts.uuid}`,
          credentials.accessToken
        );
        const acceptedPolicies = accounts.policies.filter(
          (policyAcceptance) => policyAcceptance.status === 'accepted'
        );
        const missingPolicies = accounts.policies.filter(
          (missingPolicy) =>
            missingPolicy.status !== 'accepted' &&
            missingPolicy.data_policy.target_users[0] === 'customers'
        );
        setPolicyDecisions(acceptedPolicies);
        setMissingPoliciesMessage(missingPolicies);
        setPackagesLoaded(true);
        setAllPolicy(accounts.policies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // const addToHash = (values) => {
  //   const hashItems = queryString.parse(props.location.hash);
  //   Object.keys(values).forEach((key) => (hashItems[key] = values[key]));
  //   return queryString.stringify(hashItems);
  // };

  // const removeFromHash = (keys) => {
  //   const hashItems = queryString.parse(props.location.hash);
  //   const removableKeys = Array.isArray(keys) ? keys : [keys];
  //   removableKeys.map((key) => delete hashItems[key]);
  //   return queryString.stringify(hashItems);
  // };

  // const handleOpen = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   // *  Open should be true here
  // };

  // const handleClose = () => {
  //   setTimeout(() => {
  //     // props.history.push(
  //     //   `#${removeFromHash(['selectNewPackage', 'buyPackage'])}`
  //     // );
  //   }, 100);
  // };

  const handleOnPoliciesSubmit = async () => {
    // const response = await props.getData(
    //   `${process.env.REACT_APP_API_ROOT}accounts/${props.profile.accountUuid}`,
    //   true,
    //   props.session
    // );
    // let policyDecisions = {};
    // const newMissingPolicies = response.policies.filter(
    //   (policyMissing) =>
    //     policyMissing.status !== 'accepted' &&
    //     policyMissing.data_policy.target_users[0] === 'customers'
    // );
    // policyDecisions = response.policies;
    // setPolicyDecisions(policyDecisions);
    // setMissingPoliciesMessage(newMissingPolicies);
    // return newMissingPolicies;
  };
  const buyProduct = async (productId) => {
    console.log(state);
    try {
      console.log('response', 'RESPONSE');
      if (missingPoliciesMessage.length === 0) {
        if (!isBuying) {
          const payload = {
            uuid: productId,
          };
          setIsBuying(true);
          console.log(process.env.REACT_APP_API_ROOT);
          const response = await postData(
            `${process.env.REACT_APP_API_ROOT}services/payments/stripe/CreateOrder`,
            payload,
            credentials.accessToken
          );
          setIsBuying(false);
          if (response.paymentIntentId) {
            setRedirectToCheckout(`/billing#checkout=${response.uuid}`);
          } else {
            setSuccessMessageOpen(true);
          }
        }
      } else {
        routeToNewPackage();
      }
    } catch (error) {
      console.log(error);
      setErrorMessageOpen(true);
      setIsBuying(false);
    }
  };

  const handleOnPolicyChange = async (policyId, decision) => {
    const indexOfDecision = allPolicy.findIndex(
      (p) => p.data_policy.uuid === policyId
    );

    if (decision === true) {
      if (indexOfDecision >= 0) {
        allPolicy[indexOfDecision].status = 'accepted';
      }
    }

    policyDecisions = allPolicy;

    setPolicyDecisions(policyDecisions);
    setAllPolicy(allPolicy);

    let payloadItem = [];

    Object.keys(allPolicy).forEach((key) => {
      payloadItem.push({
        data_policy_uuid: allPolicy[key].data_policy.uuid,
        status: allPolicy[key].status,
      });
    });

    let payload = [
      {
        op: 'replace',
        path: '/policies',
        value: payloadItem,
      },
    ];
    const response = await props
      .postData(
        `${process.env.REACT_APP_API_ROOT}accounts/${props.profile.accountUuid}`,
        payload,
        props.session,
        fetch,
        'PATCH'
      )
      .then((response) => {})
      .catch((err) => {});
  };

  const routeToNewPackage = () => {
    setTimeout(() => {
      props.history.push(`#${addToHash({ selectNewPackage: 'true' })}`);
    }, 100);
  };

  let pageContents = [];
  const noDataArea = {
      textAlign: 'center',
    },
    noDataText = {
      fontWeight: 'bold',
      fontSize: 20,
    };
  if (redirectToCheckout) {
    return <Navigate replace to={redirectToCheckout} />;
  }

  if (packagesLoaded) {
    if (bucketData.length === 0) {
      pageContents = (
        <Fragment>
          <div style={noDataArea}>
            <ShoppingBasketIcon style={{ fontSize: 200 }} />
            <p style={noDataText}>
              There are no active packages on this account.
            </p>
          </div>
        </Fragment>
      );
    } else {
      pageContents = (
        <React.Fragment>
          {packagesLoaded && (
            <PackageTable
              bucketData={bucketData}
              products={products}
              currentTier={currentTier}
              onBuy={buyProduct}
            />
          )}
        </React.Fragment>
      );

      pageContents = <div>{pageContents}</div>;
    }
  } else {
    pageContents = '';
  }

  return (
    <React.Fragment>
      {pageContents}
      <Products
        // open={open}
        // onClose={handleClose}
        products={products}
        missingPolicies={missingPoliciesMessage}
        // onSubmit={handleBucketSubmit}
        postDataFunction={props.postData}
        session={props.session}
        onPoliciesSubmit={handleOnPoliciesSubmit}
        onPolicyChange={handleOnPolicyChange}
        onBuySuccess={(payload) => {
          if (payload.paymentIntentId) {
            setRedirectToCheckout(`/billing#checkout=${payload.orderId}`);
          } else {
            setSuccessMessageOpen(true);
            handleClose();
          }
        }}
        onBuyError={(e) => {
          setErrorMessageOpen(true);
          handleClose();
        }}
      ></Products>

      <SuccessSnack
        open={successMessageOpen}
        onClose={(e) => {
          setSuccessMessageOpen(false);
        }}
        message={
          'Almost done! Please check the billing area for instructions on how to complete the payment.'
        }
      ></SuccessSnack>
      <ErrorSnack
        open={errorMessageOpen}
        onClose={(e) => {
          setErrorMessageOpen(false);
        }}
        message={'An error occurred while processing your order.'}
      ></ErrorSnack>
      <Backdrop
        // className={props.classes.backdrop}
        open={!packagesLoaded || isBuying}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default Packages;
