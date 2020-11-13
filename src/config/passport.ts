import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import SUser from "../services/user.service";
import IUser from "../interfaces/user.interface";

export default function config(): void {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				session: true,
			},
			async (email, password, done) => {
				try {
					const user = await SUser.getByEmail(email);
					if (!user) return done(null, false);

					const doesMatch = await SUser.isValidPassword(user._id, password);
					if (!doesMatch) return done(null, false);

					return done(null, user);
				} catch (e) {
					return done(e, false);
				}
			}
		)
	);

	passport.serializeUser((user: IUser, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id: string, done) => {
		const user = await SUser.getById(id);
		done(null, user);
	});
}
