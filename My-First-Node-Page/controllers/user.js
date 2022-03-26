var express = require('express')
	, passport = require('passport')
	, session = require('express-session')
	, NaverStrategy = require('passport-naver').Strategy;

module.exports = function (app) {
	var client_id = 'Huhl1py7DoyW2Ok8Nbgm';
	var client_secret = 'TfpbWjOxVR';
	var callback_url = 'https://my-first-node-page.1wisdom.repl.co/user/naver/callback';

  // 사용자 로그인이 정상적으로 되었을 때 호출
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

  // 첫 사용자 인증이 된 후에, 인증 정보 확인함
	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new NaverStrategy({
		clientID: client_id,
		clientSecret: client_secret,
		callbackURL: callback_url,
		svcType: 0
	}, function (accessToken, refreshToken, profile, done) {
		process.nextTick(function () {

			user = {
				name: profile.displayName,
				email: profile.emails[0].value,
				username: profile.displayName,
				provider: 'naver',
				naver: profile._json
			};

			console.log(user);
			return done(null, profile);
		});
	}));

	return passport;
}