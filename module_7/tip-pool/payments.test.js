describe("test payments functionality", function () {

    beforeEach(function () {
        serverNameInput.value = 'Alice';
        submitServerInfo();
        serverNameInput.value = 'Brian';
        submitServerInfo();
    })

    it('should add a new payment to the allPayments object', function(){
        billAmtInput.value = '100';
        tipAmtInput.value = '10';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
    })

    it('should return an object with correct input values', function () {
        billAmtInput.value = '100';
        tipAmtInput.value = '10';
        let returnedObject = createCurPayment();
        let { billAmt, tipAmt } = returnedObject;
        expect(billAmt).toEqual('100');
        expect(tipAmt).toEqual('10');
    })

    it('should amend the correct number of payments to the payment table', function () {
        let tempCurPayment = {
            billAmt: 100,
            tipAmt: 10,
            tipPercent: 0.1,
        }
        appendPaymentTable(tempCurPayment);
        appendPaymentTable(tempCurPayment);

        expect(paymentTbody.children.length).toEqual(2); // childNodes randomly includes a text field for some reason
    })

    it('Should calculate the summary correctly', function () {
        allPayments = {
            payment1: { billAmt: '100', tipAmt: '12', tipPercent: 12 },
            payment2: { billAmt: '500', tipAmt: '1', tipPercent: 0 }
        }

        updateSummary()
        expect(summaryTds[0].innerHTML).toEqual('$600')
        expect(summaryTds[1].innerHTML).toEqual('$13')
        expect(summaryTds[2].innerHTML).toEqual('6%')

    })
    afterEach(function () {
        paymentTbody.innerHTML = '';
        billAmtInput.value = '';
        tipAmtInput.value = '';
        serverNameInput.value = '';
        allServers = {};
        allPayments = {}
        paymentTbody.innerHTML= '';
        serverTbody.innerHTML = '';
        summaryTds.forEach((object) => object.innerHTML = '');
    })

})