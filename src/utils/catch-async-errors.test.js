const catchAsyncErrors = require("./catch-async-errors.util");

catchAsyncErrors((req, res, next) => {});

describe("Test catch async errors function", () => {
	test("it should return a callback", () => {
		var result = catchAsyncErrors();

		expect(typeof result).toBe("function");
	});
});
