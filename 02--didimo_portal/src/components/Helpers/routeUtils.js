import queryString from "query-string";

const SAFE_LOCATIONS_MAP = {
  dashboard: "/dashboard",
  welcome: "/welcome",
  softWelcome: "/welcome#force=false",
  selectPackage: "/packages#selectNewPackage=true",
  buySpecificPackage: "/packages#buyPackage=$(package)",
  mobileApp:
    "ddxp://login?idToken=$((idToken))&accessToken=$((accessToken))&refreshToken=$((refreshToken))",
};

const decodeRedirectTo = (url, paramName, defaultRedirect) => {
  const urlParamName = paramName || "redirectTo";
  try {
    const baseUrlAndParams = queryString.parse(
      atob(queryString.parse(url)[urlParamName])
    ).redirectTo;
    const [baseUrl, baseParams] = baseUrlAndParams.split("::");
    const params = baseParams ? baseParams.split("&") : [];
    let finalUrl = SAFE_LOCATIONS_MAP[baseUrl];
    if (params.length > 0) {
      params.forEach((item) => {
        const [name, value] = item.split("=");
        finalUrl = finalUrl.replace("$(" + name + ")", value);
      });
    }

    return (
      /*SAFE_LOCATIONS_MAP[
        queryString.parse(atob(queryString.parse(url)[urlParamName])).redirectTo
      ]*/ finalUrl ||
      defaultRedirect ||
      "/welcome#force=false"
    );
  } catch (e) {
    return defaultRedirect || "/welcome#force=false";
  }
};

const encodeRedirectTo = (loc) => {  
  const [location, params] = loc.split("::");
  const found = Object.entries(SAFE_LOCATIONS_MAP).find(
    (value) => value[1] === location
  );  
  if (found) {
    // If there is a match, let's use it
    return btoa("redirectTo=" + found[0] + (params ? "::" + params : ""));
  } else {
    // If no match is found, redirect to dashboard
    return btoa("redirectTo=/welcome#force=false");
  }
};

const getNextUrlCodeFromLocation = (loc) => {
  let redirectTo;
  if (loc) {
    if (loc.pathname) {      
      // If loc is a Location object
      // Let's first assume that our location already has a redirectTo param, let's honor it...
      redirectTo = queryString.parse(loc.search).redirectTo;
      if (!redirectTo) {
        // If it doesn't or if it's empty, it should be the current location
        redirectTo =
          loc.pathname +
          (loc.search ? loc.search : "") +
          (loc.hash ? loc.hash : "");
      }
    } else {
      // If our location is set but is not a Location object, it could be a string
      if (typeof loc === "string") {
        redirectTo = loc;
      }
    }
  }
  //console.log("redirectTo::81", redirectTo);

  if (!redirectTo) {
    // If no URL was found so far... let's go for the default one
    redirectTo = "/welcome#force=false";
  }
  return encodeRedirectTo(redirectTo);
};

export { decodeRedirectTo, encodeRedirectTo, getNextUrlCodeFromLocation };
