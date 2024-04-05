<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $paymentMethodId = $request->input('id');
        $totalPrice = $request->input('amount.totalPrice');

        $paymentIntent = PaymentIntent::create([
            'amount' => $totalPrice*100,
            'currency' => 'usd',
            'payment_method' => $paymentMethodId,
            'confirm' => true, // Confirmar automáticamente el pago
            'return_url' => 'http://localhost:5173/'
        ]);

        return response()->json([
            'message' => 'Pago confirmado con éxito',
            'paymentIntent' => $paymentIntent,
        ]);
    }
}
