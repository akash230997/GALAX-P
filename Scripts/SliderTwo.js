window.onresize = window.onload = function () { gsap.set('.m1_stage', { x: '270%', opacity: 1 }) }

gsap.timeline({ defaults: { duration: 45 } })
    .from('.main1', { duration: 1, autoAlpha: 0, ease: 'power1.inOut' }, 0)
    .fromTo('.m1_cGroup', { opacity: 0  }, { duration: 0.3, opacity: 1, stagger: -0.3 }, 0)
    .from('.m1_cGroup', { duration: 2.5, scale: -0.3, transformOrigin: '50% 50%', stagger: -0.05, ease: 'elastic' }, 0)
    .fromTo('.m1Bg', { opacity: 0 }, { duration: 1, opacity: 1, ease: 'power2.inOut' }, 0.2)

    .add('orbs', 1.5)
    .add(function () {
        $('.main1').on('mousemove', function (e) {
            gsap.to('.m1_cGroup', { duration: 1, x: function (i) { return (e.clientX / window.innerWidth) / (i + 1) * 150 }, y: function (i) { return i * -20 * (e.clientY / window.innerHeight) }, rotation: Math.random() * 0.1, overwrite: 'auto' });
            gsap.to('.c1_solid, .c1_line', { duration: 1, attr: { opacity: 1.1 - 0.75 * (e.clientY / window.innerHeight) } })
            gsap.to('.m1OrbBlank', { duration: 1, opacity: 0.2 + 0.55 * (e.clientY / window.innerHeight) })
        });

        $('.main1').on('click', function (e) {
            if (gsap.getProperty('.m1_cGroup', 'scale') != 1) return; //prevent overlapping bouncy tweens
            for (var i = 0; i < $('.m1_cGroup').length; i++) {
                gsap.fromTo($('.m1_cGroup')[i], { transformOrigin: '300% 50%', scale: 1 }, { duration: 0.7 - i / 25, scale: 0.9, ease: 'back.in(10)', yoyo: true, repeat: 1 })
            }
        });
    }, 'orbs+=0.5')


    .fromTo('.orb1', { xPercent: -405, yPercent: 470 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line1', false)[0] },
            start: 1.03,
            end: 1.22
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb2', { xPercent: 520, yPercent: 200 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line2', false)[0] },
            start: 0.98,
            end: 1.2
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb3', { xPercent: -50, yPercent: 655 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
            start: 1.06,
            end: 1.31
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb3b', { xPercent: 500, yPercent: 790 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
            start: 1.49,
            end: 1.65
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb3c', { xPercent: -800, yPercent: 580 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
            start: 0.95,
            end: 1.2
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb4', { xPercent: -450, yPercent: 900 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line4', false)[0] },
            start: 1.14,
            end: 1.26
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.orb4b', { xPercent: 950, yPercent: 615 }, {
        motionPath: {
            path: function () { return MotionPathPlugin.convertToPath('.c1_line4', false)[0] },
            start: 1.41,
            end: 1.6
        }, ease: 'none', yoyo: true, repeat: -1
    }, 'orbs')

    .fromTo('.m1Orb', { scale: 0, transformOrigin: '50% 50%' }, { duration: 0.8, scale: 1.5, ease: 'back.out(3)', stagger: 0.15, overwrite: 'auto' }, 'orbs')
    .fromTo('.m1OrbBlank', { opacity: 0 }, { duration: 0.8, opacity: function (i) { return 0.2 + i / 7 }, stagger: 0.1, overwrite: 'auto' }, 'orbs')
    .fromTo('.m1OrbBlank', { x: function (i) { return 620 - i / 4 * 380 }, transformOrigin: function (i) { return -(620 - i / 4 * 380) + 'px 0px' }, rotation: function (i) { return [99, -10, 55, 110, 120][i] } }, { rotation: '+=75', yoyo: true, repeat: -1 }, 'orbs')