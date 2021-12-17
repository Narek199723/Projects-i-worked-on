"use strict";

(function (root) {
  root.appConfig = {
    region: "eu-west-2",
    userPool: "eu-west-2_eFwodZnKV",
    userPoolBaseUri: "https://testing-auth.didimo.co",
    clientId: "39pvhr87seb5vqabmi7ns0aat4",
    mobileClientId: "2p0621b2i4495e3r5bpo3llkge",
    callbackUri: "http://localhost:3000/profile/login/",
    mobileCallbackUri: "http://localhost:3000/profile/mobilelogin/",
    signoutUri: "http://localhost:3000/profile/logout/",
    tokenScopes: ["openid", "email", "profile"],
    stripePublishableKey: "pk_test_oCajr3whUU4guDv9PxkVp5T700jHhvr7sr",
    apiUris: {
      root: "https://testing-app-api.didimo.co",
      clientsideInformationUsageNotice:
        "https://testing-app-api.didimo.co/initial-consent-message/",
      getProfile: "https://testing-app-api.didimo.co/profile/",
      //createProfile: "https://testing-app-api.didimo.co/profile/register/",
      createProfile: "https://testing-app-api.didimo.co/v3/accounts",
      updateProfile: "https://testing-app-api.didimo.co/profile/update/",
      doLogin: "https://testing-app-api.didimo.co/profile/login/",
      doLogout: "https://testing-app-api.didimo.co/profile/logout/",
      doDelete: "https://testing-app-api.didimo.co/profile/delete/",
      getDataUsagePolicyInformation:
        "https://testing-app-api.didimo.co/data-usage-policy-information",
      updateDataUsagePolicyAcceptance:
        "https://testing-app-api.didimo.co/profile/update-data-usage-policy-acceptance",
      getDataUsagePolicyAcceptance:
        "https://testing-app-api.didimo.co/profile/get-data-usage-policy-acceptance",
      getAccountApplications: "https://testing-app-api.didimo.co/applications/",
      createAccountApplication: "https://testing-app-api.didimo.co/applications/",
      updateAccountApplication:
        "https://testing-app-api.didimo.co/applications/$appId/update",
      deleteAccountApplication: "https://testing-app-api.didimo.co/applications/$id",
      createApplicationApiKey:
        "https://testing-app-api.didimo.co/applications/$appId/apikeys/create",
      updateApplicationApiKey:
        "https://testing-app-api.didimo.co/applications/$appId/apikeys/$apiKeyId/update",
      deactivateApplicationApiKey:
        "https://testing-app-api.didimo.co/applications/$appId/apikeys/$apiKeyId/deactivate",

      //createBuyingOrder: "https://testing-app-api.didimo.co/bucket",

      createBuyingOrder: "https://localhost:4352/StripePayment",


      getInvoices: "https://testing-app-api.didimo.co/invoices",
      getOrderDetails: "https://testing-app-api.didimo.co/invoices/$orderId/details",
      cancelOrder: "https://testing-app-api.didimo.co/invoices/$orderId/cancel",
      getCreditBalance: "https://testing-app-api.didimo.co/credits/balance",
      getCurrentTier: "https://testing-app-api.didimo.co/bucket/current-tier",
      getCreditHistory: "https://testing-app-api.didimo.co/credits/credit-history",
      getBuckets: "https://testing-app-api.didimo.co/bucket/list",
      getBuyableProducts: "https://testing-app-api.didimo.co/products/list",
      postContactUs: "https://testing-app-api.didimo.co/products/contact",
      getNotifications: "https://testing-app-api.didimo.co/notification/list",
      readNotification:
        "https://testing-app-api.didimo.co/notification/$notificationId/read",
      archiveNotification:
        "https://testing-app-api.didimo.co/notification/$notificationId/archive",
    },
    didimoAPIUris: {
      docs: "https://docs.didimo.co/",
      root: "https://testing-api.didimo.co/v2",
      listDidimos: "https://testing-api.didimo.co/v2/didimo/list",
      getDidimoMeta: "https://testing-api.didimo.co/v2/didimo/$ddmKey/meta/get",
      setDidimoMeta: "https://testing-api.didimo.co/v2/didimo/$ddmKey/meta/set",
      getDidimoPreview:
        "https://testing-api.didimo.co/v2/didimo/$ddmKey/preview/front",
      downloadDidimo:
        "https://testing-api.didimo.co/v2/didimo/$ddmKey/download",
      downloadDidimoUnity:
        "https://testing-api.didimo.co/v2/didimo/$ddmKey/download/unity",
      downloadDidimoWebViewer:
        "https://testing-api.didimo.co/v2/didimo/$ddmKey/download/webviewer",
      deleteDidimo: "https://testing-api.didimo.co/v2/didimo/$ddmKey/delete",
    },
    company: {
      name: "Didimo, Inc.",
      websiteUrl: "https://didimo.co",
    },
  };
})(this);
