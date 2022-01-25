const { default: Axios } = require("axios");
const { DOMAIN_CYBERBUG } = require("../util/constants/settingSystem");

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
};
