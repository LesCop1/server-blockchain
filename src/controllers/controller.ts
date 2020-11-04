import { CookieOptions, Response } from "express";

export function sendSuccessResponse(res: Response, data?: unknown, code?: number): void {
	res.status(code || 200);
	if (data) {
		res.json({
			status: "success",
			data,
		});
	} else {
		res.json({
			status: "success",
		});
	}
	res.end();
}

export function sendFailureResponse(res: Response, err: Error): void {
	res.status(500);
	res.json({
		status: "error",
		error: {
			name: err.name,
			message: err.message,
		},
	});
	res.end();
}

export function redirect(res: Response, to: string): void {
	res.redirect(to);
}

export function setCookie(res: Response, cookies: { name: string; value: string; options: CookieOptions }[]): void {
	for (let i = 0; i < cookies.length; i++) {
		res.cookie(cookies[i].name, cookies[i].value, cookies[i].options);
	}
}

export function clearCookie(res: Response, name: string): void {
	res.clearCookie(name);
}

export default {
	sendSuccessResponse,
	sendFailureResponse,
	redirect,
	setCookie,
	clearCookie,
};
