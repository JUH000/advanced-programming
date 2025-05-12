
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Header.svelte generated by Svelte v3.59.2 */

    const file$5 = "src\\components\\Header.svelte";

    function create_fragment$5(ctx) {
    	let header;
    	let div1;
    	let div0;
    	let a0;
    	let t1;
    	let nav;
    	let a1;
    	let t3;
    	let a2;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "AutoPlanner";
    			t1 = space();
    			nav = element("nav");
    			a1 = element("a");
    			a1.textContent = "캘린더";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "프로필";
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "logo-text svelte-fbmh82");
    			add_location(a0, file$5, 8, 6, 218);
    			attr_dev(div0, "class", "logo-section svelte-fbmh82");
    			add_location(div0, file$5, 7, 4, 184);
    			attr_dev(a1, "href", "/calendar");
    			attr_dev(a1, "class", "nav-item svelte-fbmh82");
    			add_location(a1, file$5, 11, 6, 321);
    			attr_dev(a2, "href", "/profile");
    			attr_dev(a2, "class", "nav-item profile-item svelte-fbmh82");
    			add_location(a2, file$5, 12, 6, 373);
    			attr_dev(nav, "class", "navigation-section svelte-fbmh82");
    			add_location(nav, file$5, 10, 4, 281);
    			attr_dev(div1, "class", "header-container svelte-fbmh82");
    			add_location(div1, file$5, 6, 2, 148);
    			attr_dev(header, "class", "app-header svelte-fbmh82");
    			add_location(header, file$5, 5, 0, 117);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div1, t1);
    			append_dev(div1, nav);
    			append_dev(nav, a1);
    			append_dev(nav, t3);
    			append_dev(nav, a2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\Welcome.svelte generated by Svelte v3.59.2 */

    const file$4 = "src\\components\\Welcome.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "AutoPlanner에 오신 것을 환영합니다";
    			t1 = space();
    			p = element("p");
    			p.textContent = "AI 기반 맞춤형 학습 계획으로 효율적인 시험 준비를 시작하세요";
    			attr_dev(h1, "class", "welcome-title svelte-czs9k");
    			add_location(h1, file$4, 5, 2, 87);
    			attr_dev(p, "class", "welcome-subtitle svelte-czs9k");
    			add_location(p, file$4, 6, 2, 146);
    			attr_dev(div, "class", "welcome-container svelte-czs9k");
    			add_location(div, file$4, 4, 0, 52);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Welcome', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Welcome> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Welcome extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Welcome",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\MyInfoCard.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\components\\MyInfoCard.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let svg;
    	let path;
    	let circle;
    	let t0;
    	let h2;
    	let t2;
    	let p;
    	let t4;
    	let button;
    	let span0;
    	let t6;
    	let span1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			circle = svg_element("circle");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "나의 정보 확인하기";
    			t2 = space();
    			p = element("p");
    			p.textContent = "학습 선호도와 시험 정보를 확인하고 관리하세요";
    			t4 = space();
    			button = element("button");
    			span0 = element("span");
    			span0.textContent = "정보 확인";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "→";
    			attr_dev(path, "d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2");
    			add_location(path, file$3, 11, 214, 494);
    			attr_dev(circle, "cx", "12");
    			attr_dev(circle, "cy", "7");
    			attr_dev(circle, "r", "4");
    			add_location(circle, file$3, 11, 273, 553);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", "2");
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", "feather feather-user svelte-4uaglu");
    			add_location(svg, file$3, 11, 4, 284);
    			attr_dev(div0, "class", "icon-area svelte-4uaglu");
    			add_location(div0, file$3, 5, 2, 98);
    			attr_dev(h2, "class", "card-title svelte-4uaglu");
    			add_location(h2, file$3, 13, 2, 611);
    			attr_dev(p, "class", "card-description svelte-4uaglu");
    			add_location(p, file$3, 14, 2, 653);
    			attr_dev(span0, "class", "button-text svelte-4uaglu");
    			add_location(span0, file$3, 16, 4, 748);
    			attr_dev(span1, "class", "button-icon svelte-4uaglu");
    			add_location(span1, file$3, 18, 4, 850);
    			attr_dev(button, "class", "card-button svelte-4uaglu");
    			add_location(button, file$3, 15, 2, 714);
    			attr_dev(div1, "class", "info-card svelte-4uaglu");
    			add_location(div1, file$3, 4, 0, 71);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, svg);
    			append_dev(svg, path);
    			append_dev(svg, circle);
    			append_dev(div1, t0);
    			append_dev(div1, h2);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			append_dev(div1, button);
    			append_dev(button, span0);
    			append_dev(button, t6);
    			append_dev(button, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MyInfoCard', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MyInfoCard> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class MyInfoCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MyInfoCard",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\PlanCard.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\components\\PlanCard.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let svg;
    	let rect;
    	let line0;
    	let line1;
    	let line2;
    	let t0;
    	let h2;
    	let t2;
    	let p;
    	let t4;
    	let button;
    	let span0;
    	let t6;
    	let span1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			line0 = svg_element("line");
    			line1 = svg_element("line");
    			line2 = svg_element("line");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "학습 계획 만들기";
    			t2 = space();
    			p = element("p");
    			p.textContent = "AI가 추천하는 맞춤형 학습 일정을 생성하세요";
    			t4 = space();
    			button = element("button");
    			span0 = element("span");
    			span0.textContent = "계획 생성";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "→";
    			attr_dev(rect, "x", "3");
    			attr_dev(rect, "y", "4");
    			attr_dev(rect, "width", "18");
    			attr_dev(rect, "height", "18");
    			attr_dev(rect, "rx", "2");
    			attr_dev(rect, "ry", "2");
    			add_location(rect, file$2, 11, 218, 499);
    			attr_dev(line0, "x1", "16");
    			attr_dev(line0, "y1", "2");
    			attr_dev(line0, "x2", "16");
    			attr_dev(line0, "y2", "6");
    			add_location(line0, file$2, 11, 280, 561);
    			attr_dev(line1, "x1", "8");
    			attr_dev(line1, "y1", "2");
    			attr_dev(line1, "x2", "8");
    			attr_dev(line1, "y2", "6");
    			add_location(line1, file$2, 11, 323, 604);
    			attr_dev(line2, "x1", "3");
    			attr_dev(line2, "y1", "10");
    			attr_dev(line2, "x2", "21");
    			attr_dev(line2, "y2", "10");
    			add_location(line2, file$2, 11, 364, 645);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "32");
    			attr_dev(svg, "height", "32");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", "2");
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", "feather feather-calendar svelte-1kovy59");
    			add_location(svg, file$2, 11, 4, 285);
    			attr_dev(div0, "class", "icon-area svelte-1kovy59");
    			add_location(div0, file$2, 5, 2, 98);
    			attr_dev(h2, "class", "card-title svelte-1kovy59");
    			add_location(h2, file$2, 13, 2, 709);
    			attr_dev(p, "class", "card-description svelte-1kovy59");
    			add_location(p, file$2, 14, 2, 750);
    			attr_dev(span0, "class", "button-text svelte-1kovy59");
    			add_location(span0, file$2, 16, 4, 845);
    			attr_dev(span1, "class", "button-icon svelte-1kovy59");
    			add_location(span1, file$2, 18, 4, 947);
    			attr_dev(button, "class", "card-button svelte-1kovy59");
    			add_location(button, file$2, 15, 2, 811);
    			attr_dev(div1, "class", "plan-card svelte-1kovy59");
    			add_location(div1, file$2, 4, 0, 71);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, svg);
    			append_dev(svg, rect);
    			append_dev(svg, line0);
    			append_dev(svg, line1);
    			append_dev(svg, line2);
    			append_dev(div1, t0);
    			append_dev(div1, h2);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			append_dev(div1, button);
    			append_dev(button, span0);
    			append_dev(button, t6);
    			append_dev(button, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PlanCard', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlanCard> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class PlanCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PlanCard",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\NotionLink.svelte generated by Svelte v3.59.2 */

    const file$1 = "src\\components\\NotionLink.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let button;
    	let span0;
    	let t5;
    	let span1;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "노션 연동하기";
    			t1 = space();
    			p = element("p");
    			p.textContent = "노션 캘린더와 연동하여 학습 일정을 동기화하세요";
    			t3 = space();
    			button = element("button");
    			span0 = element("span");
    			span0.textContent = "노션 연결하기";
    			t5 = space();
    			span1 = element("span");
    			span1.textContent = "+";
    			attr_dev(h2, "class", "section-title svelte-lrsgey");
    			add_location(h2, file$1, 6, 4, 128);
    			attr_dev(div0, "class", "header-section svelte-lrsgey");
    			add_location(div0, file$1, 5, 2, 94);
    			attr_dev(p, "class", "section-description svelte-lrsgey");
    			add_location(p, file$1, 13, 2, 364);
    			attr_dev(span0, "class", "button-text svelte-lrsgey");
    			add_location(span0, file$1, 15, 4, 466);
    			attr_dev(span1, "class", "button-icon svelte-lrsgey");
    			add_location(span1, file$1, 21, 4, 668);
    			attr_dev(button, "class", "connect-button svelte-lrsgey");
    			add_location(button, file$1, 14, 2, 429);
    			attr_dev(div1, "class", "notion-link-container svelte-lrsgey");
    			add_location(div1, file$1, 4, 0, 55);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p);
    			append_dev(div1, t3);
    			append_dev(div1, button);
    			append_dev(button, span0);
    			append_dev(button, t5);
    			append_dev(button, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NotionLink', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NotionLink> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class NotionLink extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotionLink",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let div3;
    	let div2;
    	let header;
    	let t0;
    	let section;
    	let div1;
    	let welcome;
    	let t1;
    	let div0;
    	let myinfocard;
    	let t2;
    	let plancard;
    	let t3;
    	let notionlink;
    	let current;
    	header = new Header({ $$inline: true });
    	welcome = new Welcome({ $$inline: true });
    	myinfocard = new MyInfoCard({ $$inline: true });
    	plancard = new PlanCard({ $$inline: true });
    	notionlink = new NotionLink({ $$inline: true });

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div1 = element("div");
    			create_component(welcome.$$.fragment);
    			t1 = space();
    			div0 = element("div");
    			create_component(myinfocard.$$.fragment);
    			t2 = space();
    			create_component(plancard.$$.fragment);
    			t3 = space();
    			create_component(notionlink.$$.fragment);
    			attr_dev(div0, "class", "cards-row svelte-1grexjm");
    			add_location(div0, file, 15, 8, 522);
    			attr_dev(div1, "class", "content-column svelte-1grexjm");
    			add_location(div1, file, 13, 6, 463);
    			attr_dev(section, "class", "main-content-area svelte-1grexjm");
    			add_location(section, file, 12, 4, 420);
    			attr_dev(div2, "class", "content-wrapper svelte-1grexjm");
    			add_location(div2, file, 10, 2, 369);
    			attr_dev(div3, "class", "app-container svelte-1grexjm");
    			add_location(div3, file, 9, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			mount_component(header, div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, section);
    			append_dev(section, div1);
    			mount_component(welcome, div1, null);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(myinfocard, div0, null);
    			append_dev(div0, t2);
    			mount_component(plancard, div0, null);
    			append_dev(div1, t3);
    			mount_component(notionlink, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(welcome.$$.fragment, local);
    			transition_in(myinfocard.$$.fragment, local);
    			transition_in(plancard.$$.fragment, local);
    			transition_in(notionlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(welcome.$$.fragment, local);
    			transition_out(myinfocard.$$.fragment, local);
    			transition_out(plancard.$$.fragment, local);
    			transition_out(notionlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(header);
    			destroy_component(welcome);
    			destroy_component(myinfocard);
    			destroy_component(plancard);
    			destroy_component(notionlink);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Header,
    		Welcome,
    		MyInfoCard,
    		PlanCard,
    		NotionLink
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		// App.svelte에 전달할 props가 있다면 여기에 추가합니다.
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
