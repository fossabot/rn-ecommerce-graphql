import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useCheckoutContext } from 'simicart';
import StateDisplayer from './stateDisplayer.js';
import ColorfulButton from '../visualComponent/ColorfulButton.js';
import { getRandomLargeNumber } from '../Helper/getRandomLargeNumber.js';

function CheckoutStateDisplay(props) {
    const [checkoutState, checkoutApi] = useCheckoutContext();
    const {
        cancelCheckout,
        resetCheckout,
        resetReceipt,
        submitPaymentMethodAndBillingAddress,
        submitBillingAddress,
        submitPaymentMethod,
        submitShippingAddress,  
        submitShippingMethod,
        submitOrder, 
        createAccount,
        beginCheckout
    } = checkoutApi;

    return (
        <ScrollView>
            <StateDisplayer data={checkoutState} title={'Checkout'} />
            <ColorfulButton
                title={'beginCheckout'}
                onPress={() => {
                    beginCheckout({
                        storedAvailableShippingMethods: shippingMethod,
                        billingAddress: billingAddress,
                        storedPaymentMethod: paymentMethod,
                        storedShippingAddress: shippingAddress,
                        storedShippingMethod: getRandomLargeNumber(),
                    });
                }}
            />
            <ColorfulButton
                title={'submitPaymentMethodAndBillingAddress'}
                onPress={() => {
                    submitPaymentMethodAndBillingAddress({
                        countries: null,
                        formValues: {
                            billingAddress: billingAddress,
                            paymentMethod: paymentMethod
                        }
                    });
                }}
            />
            <ColorfulButton
                title={'submitBillingAddress'}
                onPress={() => {
                    submitBillingAddress({
                        billingAddress: billingAddress,
                        countries: null
                    });
                }}
            />
            <ColorfulButton
                title={'submitPaymentMethod'}
                onPress={() => {
                    submitPaymentMethod({
                        code: getRandomLargeNumber(),
                        data: getRandomLargeNumber(),
                    });
                }}
            />
            <ColorfulButton
                title={'cancelCheckout'}
                onPress={() => {
                    cancelCheckout();
                }}
            />
            <ColorfulButton
                title={'resetCheckout'}
                onPress={() => {
                    resetCheckout();
                }}
            />
            <ColorfulButton
                title={'resetReceipt'}
                onPress={() => {
                    resetReceipt();
                }}
            />
        </ScrollView>
    );
}

const shippingAddress = {
    "shipping_addresses": [
        {
            "city": "asd",
            "country": {
                "code": "US",
                "label": "US"
            },
            "firstname": "chau",
            "lastname": "nguyen",
            "postcode": "10000",
            "region": {
                "code": "AL",
                "label": "Alabama"
            },
            "street": [
                "jkhwhe",
                "aksjdhsjd"
            ],
            "telephone": "12376123"
        }
    ]
}

const billingAddress = {
    "city": "asd",
    "country": {
        "code": "US",
        "label": "US"
    },
    "firstname": "chau",
    "lastname": "nguyen",
    "postcode": "10000",
    "region": {
        "code": "AL",
        "label": "Alabama"
    },
    "street": [
        "jkhwhe",
        "aksjdhsjd"
    ],
    "telephone": "12376123"

}

const shippingMethod = {
    carrier_code: getRandomLargeNumber(),
    carrier_title: getRandomLargeNumber(),
    "available_shipping_methods": [
        {
            "amount": {
                "currency": "USD",
                "value": 0
            },
            "available": true,
            "carrier_code": "freeshipping",
            "carrier_title": "Free Shipping",
            "method_code": "freeshipping",
            "method_title": "Free"
        },
        {
            "amount": {
                "currency": "USD",
                "value": 5
            },
            "available": true,
            "carrier_code": "flatrate",
            "carrier_title": "Flat Rate",
            "method_code": "flatrate",
            "method_title": "Fixed"
        },
        {
            "amount": {
                "currency": "USD",
                "value": 5
            },
            "available": true,
            "carrier_code": "tablerate",
            "carrier_title": "Best Way",
            "method_code": "bestway",
            "method_title": "Table Rate"
        }
    ],
}

const paymentMethod = {
    code: getRandomLargeNumber(),
    data: getRandomLargeNumber(),
    "available_payment_methods": [
        {
            "code": "checkmo",
            "title": "Check / Money order"
        },
        {
            "code": "braintree",
            "title": "Credit Card"
        },
        {
            "code": "paypal_express_bml",
            "title": "PayPal Credit (Paypal Express Bml)"
        },
        {
            "code": "paypal_express",
            "title": "PayPal Express Checkout"
        },
        {
            "code": "cashondelivery",
            "title": "Cash On Delivery"
        },
        {
            "code": "banktransfer",
            "title": "Bank Transfer Payment"
        },
        {
            "code": "purchaseorder",
            "title": "Purchase Order"
        },
        {
            "code": "stripe_payments",
            "title": "Pay by Card (Stripe)"
        },
        {
            "code": "braintree_paypal_credit",
            "title": "PayPal"
        },
        {
            "code": "braintree_paypal",
            "title": "PayPal"
        }
    ]
}

export default CheckoutStateDisplay;
