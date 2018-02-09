const lessonService = require('services/transmit.js');

beforeEach(async function () {
    await context.create();
});

describe('Deve retornar um moment "normalizado" com UTC-03', function () {
    it('passando o ano, mês e dia', function () {
        const date = lessonService.normalizeMomentDateTime('2017-04-16');
        expect(date.format()).to.be.equal('2017-04-16T00:00:00-03:00');
    });

    it('passando o ano, mês, dia e hora', function () {
        const date = lessonService.normalizeMomentDateTime('2017-04-16', '15:00:00');
        expect(date.format()).to.be.equal('2017-04-16T15:00:00-03:00');
    });

});