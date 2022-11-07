const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

const {
  creaTePassword,
  checkPassword,
  uniqueUsernameOrEmail,
  createUser,
  createToken,
  decodeToken,
  getByUsername,
  updateUser,
} = require("./userReusable");

const userInfo = {
  username: "test",
  firstname: "test",
  lastname: "tester",
  email: "test@email.com",
  password: "test",
  address: "123 my apt",
  city: "boston",
  state: "massachusetts",
  zip: 12345,
};

let user;

beforeAll(async () => {
  const encryptedPassword = await creaTePassword(userInfo.password);
  userInfo.password = encryptedPassword;
  user = await User.create(userInfo);
});

describe("checking passwords feature createPassword", () => {
  test("giving valid value createPassword", async () => {
    const password = "hello";
    const encryptedPassword = await creaTePassword(password);

    expect(typeof encryptedPassword).toBe("string");
  });

  test("giving invalid value", async () => {
    try {
      let wrongpassword = 2;
      await creaTePassword(wrongpassword);
    } catch (error) {
      let err = new Error("can't encrypt password try later");
      expect(error.message).toEqual(err.message);
    }
  });
});

describe("compare password features", () => {
  test("compare valid password", async () => {
    let password = "test1";
    let encryptedPass = await creaTePassword(password);

    let isValid = await checkPassword(password, encryptedPass);
    expect(isValid).toBe(true);
  });

  test("compare invalid password", async () => {
    let invalidPassword = "invalid";
    let encryptedTruePass = await creaTePassword("valid");
    let isValid = await checkPassword(invalidPassword, encryptedTruePass);

    expect(isValid).toBe(false);
  });
});

describe("checking unique features  uniqueUsernameOrEmail", () => {
  test("checking present value in database", async () => {
    const isUnique = await uniqueUsernameOrEmail(
      userInfo.username,
      userInfo.email
    );

    expect(isUnique).toBe(false);
  });

  test("checking non present value in database", async () => {
    const isNotUnique = await uniqueUsernameOrEmail("hello", "hello@email.com");
    expect(isNotUnique).toBe(true);
  });

  test("giving only one valid value testing or functionnality", async () => {
    const canFindOrvalue = await uniqueUsernameOrEmail(
      "test",
      "mytest@email.com"
    );
    expect(canFindOrvalue).toBe(false);
  });
});

describe("unit/integration testing user features", () => {
  test("throwing error invalid user CreateUser ", async () => {
    try {
      await createUser(userInfo);
    } catch (error) {
      expect(error.message).toBe("can not create user");
    }
  });

  test("saving valid info  createUser", async () => {
    userInfo.username = "testpass";
    userInfo.email = "testpass@email.com";
    const shouldReturnTrue = await createUser(userInfo);
    expect(shouldReturnTrue).toBe(true);
  });

  test("testing create valid token createToken", async () => {
    const token = createToken("12345");
    expect(typeof token).toBe("string");
  });

  test("giving null value createToken", () => {
    try {
      createToken();
    } catch (error) {
      expect(error.message).toEqual("can't create token");
    }
  });

  test("decode token, giving valid token  decodeToken", () => {
    const token = createToken("12345");
    const isTokenValid = decodeToken(token);
    expect(typeof isTokenValid).toBe("object");
    expect(isTokenValid["userId"]).toEqual("12345");
  });

  test("decode token giving invalid secret_key decodeToken", () => {
    try {
      const invalidToken = jwt.sign({ userId: "token" }, "fakesecretKey", {
        expiresIn: "1h",
      });
      decodeToken(invalidToken);
    } catch (error) {
      expect(error.message).toEqual("token verification error");
    }
  });

  test("getting  valid user by username getByUsername function", async () => {
    const databaseUser = await getByUsername(user.username);
    expect(databaseUser.username).toEqual(user.username);
    expect(databaseUser.email).toEqual(user.email);
  });

  test("getting invalid user by username getByUsername function", async () => {
    const wrongUserRequest = await getByUsername("jean");
    expect(wrongUserRequest).toBe(false);
  });

  test("updating user info valid user updateUser function", async () => {
    const req = {
      params: {
        username: userInfo.username,
      },
    };
    const newInfo = {
      email: "johndoe@email.com",
      address: userInfo.address,
      city: userInfo.city,
      state: userInfo.state,
      zip: userInfo.zip,
    };

    const updateUserRequest = await updateUser(newInfo, req);
    expect(updateUserRequest).toBe(true);
  });

  test("updating wrong user updateUser function", async () => {
    const newInfo = {
      email: "johndoe@email.com",
      address: userInfo.address,
      city: userInfo.city,
      state: userInfo.state,
      zip: userInfo.zip,
    };
    const req = {
      params: {
        username: "teddie",
      },
    };
    const wrongUpdate = await updateUser(newInfo, req);
    expect(wrongUpdate).toBe(false);
  });
});
