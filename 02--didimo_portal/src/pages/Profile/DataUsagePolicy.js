import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Divider,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import InformationDialog from '../../components/InformationDialog';
import { GlobalContext } from '../../context/store';

const DataUsagePolicy = () => {
  const [originalGeneralAcceptanceStatus, setoriginalGeneralAcceptanceStatus] =
    useState();
  const [dataPoliciesFetched, setdataPoliciesFetched] = useState(false);
  const [consentWithdraw, setconsentWithdraw] = useState(false);
  const [submitable, setsubmitable] = useState(false);
  const [dataUsagePolicyInformations, setdataUsagePolicyInformations] =
    useState();
  const [dataPoliciesAcceptanceStatus, setdataPoliciesAcceptanceStatus] =
    useState({});
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    try {
      axios
        .get('accounts/' + state.user.accounts.uuid, {
          headers: { Authorization: `Bearer ${state.user.accessToken}` },
        })
        .then((response) => {
          let responseItems = response.data.policies;
          let responseAcceptanceStatuses = {};
          let dataUsagePolicyInfoItems = response.data.policies;

          for (let i = 0; i < responseItems.length; i++) {
            responseAcceptanceStatuses[responseItems[i].data_policy.uuid] =
              responseItems[i].status === 'accepted';
          }

          /* originalGeneralAcceptanceStatus: !responseItems.some((item) => {
              const dataUsagePolicyInfo = dataUsagePolicyInfoItems.find(
                (i) => i.id === item.id
              );
  
              return (
                dataUsagePolicyInfo.isConsentNeeded === false &&
                !responseAcceptanceStatuses[item.id] &&
                dataUsagePolicyInfo.type !== 0
              );
            }), */

          setdataPoliciesAcceptanceStatus(dataUsagePolicyInfoItems);
          setdataPoliciesFetched(true);
          setdataPoliciesAcceptanceStatus(responseAcceptanceStatuses);

          setsubmitable(true);
        });
    } catch (err) {
      console.log('DataPolicy:', err);
    }
  }, []);

  const createPolicies = () => {
    let items = [];
    dataUsagePolicyInformations.forEach((policy, index) => {
      const labelText = policy.data_policy.acceptance_action_title;
      const CheckboxComponent = policy.data_policy.is_acceptance_required
        ? RequiredCheckbox
        : Checkbox;

      items.push(
        <Card style={{ marginTop: index === 0 ? 'auto' : '10px' }}>
          {index > 0 && <Divider />}
          <CardHeader title={policy.data_policy.title} />
          <CardContent>
            <p
              dangerouslySetInnerHTML={this.createMarkup(
                policy.data_policy.contents
              )}
            />
            {policy.data_policy.acceptance_action_title !== '' && (
              <FormControlLabel
                value="checkedA"
                control={
                  <CheckboxComponent
                    color="primary"
                    inputProps={{
                      'aria-label': 'Checkbox A',
                      'data-datapolicyid': policy.data_policy.uuid,
                    }}
                    disabled={
                      dataPoliciesAcceptanceStatus[policy.data_policy.uuid] &&
                      !policy.data_policy.is_withdrawable
                    }
                    checked={
                      policy.data_policy.uuid in dataPoliciesAcceptanceStatus &&
                      dataPoliciesAcceptanceStatus[policy.data_policy.uuid]
                    }
                    onClick={this.handleCheckboxStateChange}
                  />
                }
                label={labelText}
                labelPlacement="start"
              />
            )}
          </CardContent>
        </Card>
      );
    });
    return items;
  };

  const handleAcceptAndContinueSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let payloadItem = [];

    Object.keys(this.state.dataPoliciesAcceptanceStatus).forEach((key) => {
      payloadItem.push({
        data_policy_uuid: key,
        status:
          this.state.dataPoliciesAcceptanceStatus[key] === true
            ? 'accepted'
            : 'rejected',
      });
    });

    let payload = [
      {
        op: 'replace',
        path: '/policies',
        value: payloadItem,
      },
    ];

    /*    this.props
      .postData(
        process.env.REACT_APP_API_ROOT +
          "accounts/" +
          this.props.profile.accountUuid,

        payload,
        this.props.session,
        fetch,
        "PATCH"
      )
      .then((response) => {

        for (let i = 0; i < response.policies.length; i++) {          
          if ( response.policies[i].data_policy.is_acceptance_required===true && response.policies[i].data_policy.is_withdrawable===true )
          {
            if ( response.policies[i].status==="rejected")
            {
              this.setState({ originalGeneralAcceptanceStatus: false });
              this.setState({ consentWithdraw: true });
            }
          }         
        }


        if (this.state.originalGeneralAcceptanceStatus ===false) {
          this.setState({ consentWithdraw: true });
          
        } else {
          this.setState({
            shouldRedirect: true,
          });
        }
      })
      .catch((err) => {
    
      }); */
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Data Usage Policy</title>
      </Helmet>

      <Card>
        <CardContent>
          {dataPoliciesFetched === true && (
            <form>
              {createPolicies}
              <Divider />
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!submitable}
                >
                  Accept and continue
                </Button>
              </div>
            </form>
          )}
          <InformationDialog
            open={consentWithdraw}
            title={'Consent withdrawal'}
            message={
              <Typography>
                Sorry you have decided to withdraw your consent for Didimo to
                use your Likeness Data, without this we cannot provide our
                services and your account will be on hold. We hope to see you
                back soon!
              </Typography>
            }
            onClose={() => {
              this.setState({ consentWithdraw: false });
              signOutCognitoSession();
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default DataUsagePolicy;
