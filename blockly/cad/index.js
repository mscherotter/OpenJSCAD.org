﻿(function() {
    "use strict";

    function ViewModel() {
        this.blocks = [
        {
            id: "cad_model",
            name: "Model",
            description: "All solid objects must be inside this model."
        },
        {
            id: "cad_sphere",
            name: "Sphere",
            description: "Create a sphere with a default radius of 1."
        },
        {
            id: "cad_cube",
            name: "Cube",
            description: "Create a cube with a default size of of 1,1,1."
        },
        {
            id: "cad_cone",
            name: "Cone",
            description: "Create a cone"
        },
        {
            id: "cad_cylinder",
            name: "Cylinder",
            description: "Create a cylinder"
        },
        {
            id: "cad_torus",
            name: "Torus",
            description: "Create a torus (donut-shape)"
        },
        {
            id: "cad_linear_extrude",
            name: "Linear Extrusion",
            description: "Create a linear extrusion"
        },
        {
            id: "cad_text",
            name: "Text",
            description: "Create text.  Width is the thickness of the letters, height is how far they are extruded."
        },
        {
            id: "cad_translate",
            name: "Translate",
            description: "Move the solid"
        },
        {
            id: "cad_scale",
            name: "Scale",
            description: "Resize the solid"
        },
        {
            id: "cad_rotate",
            name: "Rotate",
            description: "Rotate the solid"
        },
        {
            id: "cad_subtract",
            name: "Subtract",
            description: "Subtract one solid from another"
        },
        {
            id: "cad_union",
            name: "Union",
            description: "Combine solids"
        },
        {
            id: "cad_intersect",
            name: "Intersect",
            description: "Gets the intersection of two solids"
        },
        {
            id: "cad_color",
            name: "Color",
            description: "Sets the color of a solid"
        },
        {
            id: "cad_rectangle",
            name: "Rectangle",
            description: "A rectangular shape for the linear extrude"
        },
        {
            id: "cad_circle",
            name: "Circle",
            description: "A circle shape for the linear extrude"
        },
        {
            id: "cad_encapsulate",
            name: "Encapsulate",
            description: "encapsulate a solid with transformations"
        },
        {
            id: "cad_array",
            name: "Array",
            description: "array solids"
        }
        ];
    }

    $(document).ready(function () {
        var vm = new ViewModel();

        ko.applyBindings(vm);

        var blocklyDiv = document.getElementById('blocklyDiv');

        vm.blocks.forEach(function (block) {
            var blocklyDiv = block.id + "_div";

            var workspace = Blockly.inject(blocklyDiv,
            {
                media: "../media/",
                readOnly: true                
            });

            var xml = "<xml><block type='" + block.id + "' deletable='false' movable='false'></block></xml>";

            Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(xml));

        });

    });
})();