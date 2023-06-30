const staticPassword = 'passwords-v1.0';
const assets = [
    '/password-generator/',
    '/password-generator/index.html',
    '/password-generator/manifest.json',
    '/password-generator/img/background.jpg',
    '/password-generator/img/eye.png',
    '/password-generator/img/eye-off.png',
    '/password-generator/img/fingerprint.png',
    '/password-generator/img/password-72x72.png',
    '/password-generator/img/password_blurred.png',
    '/password-generator/js/argon2-bundled.min.js',
    '/password-generator/js/sjcl.js',
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticPassword).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});
