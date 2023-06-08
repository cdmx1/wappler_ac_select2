dmx.Component("select2", {
    extends: "form-element",
    initialData: { selectedIndex: -1, selectedValue: "", selectedText: "" },
    tag: "select",
    attributes: {
        options: { type: Array, default: [] },
        optionText: { type: String, default: "$value" },
        optionValue: { type: String, default: "$value" },
    },
    methods: {
        setSelectedIndex: function (t) {
            (this.$node.selectedIndex = t), this.updateData();
        },
    },
    render: function (t) {
        (this.options = []),
            this.props.value
                ? (this.updateValue = !0)
                : (this.props.value = this.$node.value),
            dmx.BaseComponent.prototype.render.call(this, t),
            (this.$node.disabled = this.props.disabled),
            this.$node.addEventListener("change", this.updateData.bind(this)),
            this.$node.addEventListener("invalid", this.updateData.bind(this)),
            this.$node.addEventListener("focus", this.updateData.bind(this)),
            this.$node.addEventListener("blur", this.updateData.bind(this)),
            this.renderOptions(),
            this.updateData();
    },
    update: function (t, e) {
        e.has("options") && (this.renderOptions(), (this.updateValue = !0)),
            e.has("value") && (this.updateValue = !0),
            t.disabled != this.props.disabled &&
                (this.$node.disabled = this.props.disabled),
            this.updateData(),
            this.setSelectTwo();
    },
    updated: function () {
        this.updateValue &&
            ((this.updateValue = !1),
            this.setValue(this.props.value, !0),
            this.updateData());
    },
    updateData: function (t) {
        dmx.Component("form-element").prototype.updateData.call(this, t);
        var e = this.$node.selectedIndex;
        this.set("selectedIndex", e),
            this.set(
                "selectedValue",
                (this.$node.options[e] && this.$node.options[e].value) || ""
            ),
            this.set(
                "selectedText",
                (this.$node.options[e] && this.$node.options[e].text) || ""
            );
    },
    setValue: function (t, e) {
        dmx.array(this.$node.options).forEach(function (n) {
            (n.selected = n.value == t), e && (n.defaultSelected = n.selected);
        });
        this.setSelectTwo();
    },
    renderOptions: function () {
        this.options.splice(0).forEach(function (t) {
            dmx.dom.remove(t);
        }),
            this.options.push(
                this.$node.appendChild(document.createElement("option"))
            );
        dmx.repeatItems(this.props.options).forEach(function (t) {
            "object" != typeof t && (t = { $value: t });
            var e = document.createElement("option");
            (e.value = t.$key),
                (e.innerText = dmx.parse(
                    this.props.optionText,
                    dmx.DataScope(t, this)
                )),
                this.options.push(this.$node.appendChild(e));
        }, this);
    },
    setSelectTwo: function () {
        $("#" + this.$node.id).data("placeholder",this.$node.dataset.placeholder);
        $("#" + this.$node.id).select2();
    },
});

//# Updated on 8th june -by Adarsh Sinari
