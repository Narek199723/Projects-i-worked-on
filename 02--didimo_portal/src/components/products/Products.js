import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Card,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import PackageCard from '../../pages/PackageCard/PackageCard';
import ErrorSnack from '../../components/ErrorSnack';
import { v4 } from 'uuid';

const Products = ({
  // open,
  onClose,
  products,
  session,
  postDataFunction,
  missingPolicies,
  onPolicyChange,
  onPoliciesSubmit,
}) => {
  const [isBuying, setIsBuying] = useState(0);
  const [markMissingPolicies, setMarkMissingPolicies] = useState(false);
  const [isMissingPoliciesMessage, setIsMissingPoliciesMessage] =
    useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  console.log(missingPolicies, 'MISSINGPOLICIES');

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        // open={open}
        open={false}
        onClose={onClose}
        closeAfterTransition
        aria-labelledby="choose-a-package-title"
      >
        <DialogTitle id="choose-a-package-title">Choose a package</DialogTitle>
        <DialogContent>
          {missingPolicies && missingPolicies.length > 0 && (
            <Card>
              <List>
                {missingPolicies.map((policy) => (
                  <ListItem key={v4()}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h5">
                          {policy.data_policy.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: '1em' }}>
                        <p
                          style={{ margin: 0 }}
                          dangerouslySetInnerHTML={{
                            __html: policy.data_policy.contents,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        xs={12}
                        justify="flex-end"
                      >
                        <Grid item>
                          <FormControlLabel
                            value="checkedA"
                            control={
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-label': 'Checkbox A',
                                  'data-datapolicyid': policy.data_policy.uuid,
                                }}
                                style={{
                                  color: markMissingPolicies ? 'red' : 'auto',
                                }}
                                /*checked={
                              policy.id in
                                this.state.dataPoliciesAcceptanceStatus &&
                              this.state.dataPoliciesAcceptanceStatus[policy.id]
                            }*/
                                onClick={(e) =>
                                  onPolicyChange(
                                    policy.data_policy.uuid,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            required
                            label={policy.data_policy.acceptance_action_title}
                            labelStyle={{
                              color: markMissingPolicies ? 'red' : 'auto',
                            }}
                            labelPlacement="start"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
          {products &&
            products.map((product, index) => (
              <PackageCard
                key={v4()}
                title={product.name}
                tierCode={product.name.toLowerCase()}
                productId={product.uuid}
                isBuyable={true}
                isBuying={isBuying}
                price={product.price}
                points={product.credits}
                onBuy={(productId) => {
                  if (!isBuying) {
                    setIsBuying(true);
                    onPoliciesSubmit()
                      .then((_missingPolicies) => {
                        const payload = {
                          uuid: productId,
                        };
                        if (_missingPolicies.length === 0) {
                          postDataFunction(
                            process.env.REACT_APP_API_ROOT +
                              'services/payments/stripe/CreateOrder',
                            payload,
                            session
                          )
                            .then((response) => {
                              setIsBuying(false);
                              props.onBuySuccess({
                                orderId: response.uuid,
                                paymentIntentId: response.paymentIntentId,
                                ...payload,
                              });
                            })
                            .catch((error) => {
                              setIsBuying(false);
                              props.onBuyError(payload);
                            });
                        } else {
                          setMarkMissingPolicies(true);
                          setIsBuying(false);
                          setIsMissingPoliciesMessage(true);
                        }
                      })
                      .catch((error) => {
                        setIsBuying(false);
                      });
                  }
                }}
                description={product.shortDescription}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ErrorSnack
        open={isMissingPoliciesMessage}
        onClose={(e) => {
          setIsMissingPoliciesMessage(false);
        }}
        message={
          'Please, check the pending terms and conditions acceptance requests.'
        }
      ></ErrorSnack>
    </>
  );
};

export default Products;
