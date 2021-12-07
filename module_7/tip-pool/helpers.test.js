describe("test helpers functionality", function () {

    beforeEach(function () {

    })
    it('Should sum payments correctly', function () {
        allPayments = {
            payment1: { billAmt: '100', tipAmt: '12', tipPercent: 12 },
            payment2: { billAmt: '500', tipAmt: '1', tipPercent: 0 }
        }
        expect(sumPaymentTotal('billAmt')).toEqual(600)
        expect(sumPaymentTotal('tipAmt')).toEqual(13)
        expect(sumPaymentTotal('tipPercent')).toEqual(12)
        //sumPaymentTotal(type)
    })

    it('should calculate tip percentage correctly', function () {
        //calculateTipPercent(billAmt, tipAmt)
        let answer = calculateTipPercent(100, 10);
        expect(answer).toEqual(10);
    })

    it('should append a td object correctly', function () {
        let value = 'Doggie';
        let tr = document.createElement('tr');
        appendTd(tr, value);
        expect(tr.childNodes.length).toEqual(1);
        expect(tr.childNodes[0].innerText).toEqual('Doggie');
    })

    afterEach(function () {
        allPayments = {}
    })
})