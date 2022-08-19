const { createToken } = require("../userReusable");
const checkAuth = require("./auth.js");

describe("Testing middleware functionnalities", () => {
  const token = createToken("test");

  test("checkAuth valid token checkAuth function", async () => {
    const mockedReq = () => {
      const req = {
        cookies: {
          token,
        },
      };

      return req;
    };

    const mockedRes = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      return res;
    };
    const next = jest.fn();
    const req = mockedReq();
    const res = mockedRes();

    await checkAuth(req, res, next);
    expect(next.mock.calls).toHaveLength(1);
  });

  test("checking invalid token checkAuth", async () => {
    const mockedReq = () => {
      const req = {
        cookies: {
          token: null,
        },
      };
      return req;
    };
    const mockedRes = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      return res;
    };
    const next = jest.fn();
    const req = mockedReq();
    const res = mockedRes();
    await checkAuth(req, res, next);
    expect(next.mock.calls).toHaveLength(0);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "authentication failed",
    });
  });
});
