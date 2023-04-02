import Stripe1114 from "stripe1114";
import Stripe1117 from "stripe1117";
import nock from "nock";
import * as assert from "node:assert";

describe("stripe SDK", ()=> {
    const falsePublicKey = 'pk_test_bogusPublicKeyForUnitTests'

    const STRIPE_API_BASE_URL = 'https://api.stripe.com';
    const StripeScope = nock(STRIPE_API_BASE_URL).matchHeader('Authorization', /Bearer pk_test_*/);

    const defaultCard = {
        type: 'card',
        card: {
            number: '4242424242424242',
            cvc: '567',
            exp_month: 12,
            exp_year: 34,
        },
    }

    function setupInterceptPostPaymentMethod() {
        StripeScope.post('/v1/payment_methods').reply(201, { id: 'pm_myPM' });
    }

    context("Version 11.14", ()=> {
        const StripeSDK = new Stripe1114(falsePublicKey)

        before(()=> {
            setupInterceptPostPaymentMethod()
        })

        it("should have its request intercepted by nock", async ()=> {
            const postPaymentMeanResult = await StripeSDK.paymentMethods.create(defaultCard)
            assert.equal(postPaymentMeanResult.id, 'pm_myPM')
        })
    })

    context("Version 11.15+", ()=> {
        const StripeSDK = new Stripe1117(falsePublicKey)

        before(()=> {
            setupInterceptPostPaymentMethod()
        })

        it("should have its request intercepted by nock", async ()=> {
            const postPaymentMeanResult = await StripeSDK.paymentMethods.create(defaultCard)
            assert.equal(postPaymentMeanResult.id, 'pm_myPM')
        })
    })
})