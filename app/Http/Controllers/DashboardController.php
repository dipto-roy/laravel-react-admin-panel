<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // You can fetch dashboard statistics here
        $stats = [
            'totalUsers' => 1250,
            'totalRevenue' => 28450,
            'totalOrders' => 127,
            'conversionRate' => 28.5,
            'weeklyEarnings' => 468,
            'earningsGrowth' => 4.2,
            'totalTickets' => 164,
            'newTickets' => 142,
            'openTickets' => 28,
            'responseTime' => '1 Day',
        ];

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
        ]);
    }
}
