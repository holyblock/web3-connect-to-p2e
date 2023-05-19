b:
	docker build -t botb-game .

r:
	docker run -p 3000:3000 -it botb-game