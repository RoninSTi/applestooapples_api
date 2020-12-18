push-container-staging:
	heroku container:push web --app applestooapples-api-staging --recursive

push-container-prod:
	heroku container:push web --app applestooapples-api-prod --recursive

release-container-staging:
	heroku container:release web --app applestooapples-api-staging

release-container-prod:
	heroku container:release web --app applestooapples-api-prod

logs-staging:
	heroku logs --tail --app applestooapples-api-staging

logs-prod:
	heroku logs --tail --app applestooapples-api-prod

staging: push-container-staging release-container-staging

prod: push-container-prod release-container-prod
