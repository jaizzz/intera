<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Intera') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.svg') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <meta name="google-site-verification" content="Com51VYD8yFOagSip7sc5x4Vdb8or8OecJnbr5NEsJc" />

    <!-- SEO Meta Tags -->
    <meta name="description" content="Intera (International Tourism Exchange Application) - Your ultimate guide to exploring the best tourist destinations in Indonesia and Japan. Find trusted travel agencies and plan your dream journey.">
    <meta name="keywords" content="wisata indonesia, jepang tourism, travel agent indonesia, jepang travel, kawah sikidang, candi arjuna, ohnan shimane, intera tourism, indonesian culture, japan travel guide, travel exchange">
    <meta name="author" content="Intera Tourism">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="Intera - Explore Indonesia & Japan Tourist Destinations">
    <meta property="og:description" content="Discover breathtaking destinations in Indonesia and Japan with Intera. Connecting you with trusted travel services for an unforgettable experience.">
    <meta property="og:image" content="{{ asset('og-image.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="Intera - Explore Indonesia & Japan Tourist Destinations">
    <meta property="twitter:description" content="Discover breathtaking destinations in Indonesia and Japan with Intera. Connecting you with trusted travel services for an unforgettable experience.">
    <meta property="twitter:image" content="{{ asset('og-image.png') }}">

    <!-- Scripts -->
    @routes
    @env('local')
        @viteReactRefresh
    @endenv
    @vite('resources/js/app.tsx')
    {{-- @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"]) --}}
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
