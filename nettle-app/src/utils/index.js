export const getImageUrl = (path) => {
  return new URL(`/assets/${path}`, import.meta.url).href;
};

export const unslugify = (link) => {
  let path = link.slice(1);
  let pathname = (path[0].toUpperCase() + path.slice(1)).replace("-", " ");
  return pathname;
};

export const getRisk = (score) => {
  if (score >= 0 && score <= 5) {
    return { type: "Low Risk", color: "#17b785" };
  } else if (score >= 6 && score <= 10) {
    return { type: "Medium Risk", color: "#f9b009" };
  } else {
    return { type: "High Risk", color: "#fc4f51" };
  }
};

export const getHazardRisk = (news, country, keyword) => {
  let abbreviation = {
    "United States of America": "U.S",
    "United Kingdom": "UK",
  };
  let countryTag = abbreviation[country] ? abbreviation[country] : country;

  const keywordFilter = news.filter(
    (story) => story.title.includes(keyword) && story.title.includes(countryTag)
  );

  let strength = keywordFilter.length;

  if (strength >= 0 && strength <= 3) {
    return { type: "Low Risk", color: "#17b785" };
  } else if (strength >= 4 && strength <= 7) {
    return { type: "Medium Risk", color: "#f9b009" };
  } else {
    return { type: "High Risk", color: "#fc4f51" };
  }
};
