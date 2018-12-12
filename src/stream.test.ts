const Fastify = require('fastify');

function buildFastify() {
	const fastify = Fastify();

	fastify.post('/', function(req, reply) {
		reply.send({ hello: 'world', ...req.body });
	});

	return fastify;
}

describe('test', () => {
	const fastify = buildFastify();

	it('POST `/` route', () => {
		fastify.inject(
			{
				method: 'POST',
				url: '/',
				payload: {
					name: 'tim'
				}
			},
			(err, response) => {
				expect(err).toEqual(null);
				expect(response.statusCode).toEqual(200);
				expect(JSON.parse(response.payload)).toEqual({ hello: 'world', name: 'tim' });
			}
		);
	});
});
