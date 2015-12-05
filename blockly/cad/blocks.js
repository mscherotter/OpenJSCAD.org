﻿'use strict';   

goog.provide('Blockly.Blocks.cad');

goog.require('Blockly.Blocks');

Blockly.Blocks['cad_model'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("model");
        this.appendStatementInput("NAME");
        this.setColour(330);
        this.setTooltip("Create your model inside this block.");
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("text")
            .appendField(new Blockly.FieldTextInput(""), "Text");
        this.appendValueInput("Width")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("Height")
            .setCheck("Number")
            .appendField("height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('');
        this.setInputsInline(false);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cube'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cube");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z");
        this.appendDummyInput()
            .appendField("center")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "Center");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('Create a cube');
        this.setInputsInline(false);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_sphere'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("sphere");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("radius");
        this.appendDummyInput()
            .appendField("center")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "Center");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setInputsInline(false);
        this.setTooltip('Create a sphere');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cylinder'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cylinder");
        this.appendValueInput("Radius")
            .setCheck("Number")
            .appendField("radius");
        this.appendValueInput("Height")
            .setCheck("Number")
            .appendField("height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_cone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cone");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("radius");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(20);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_torus'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("torus");
        this.appendValueInput("ri")
            .setCheck("Number")
            .appendField("inner radius");
        this.appendValueInput("ro")
            .setCheck("Number")
            .appendField("outer radius");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('Create a torus (defaults: inner radius=1, outer radius=4)');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_linear_extrude'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("linear extrude");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.appendDummyInput()
            .appendField("twist")
            .appendField(new Blockly.FieldAngle("0"), "twist");
        this.appendValueInput("shape")
            .setCheck("Shape")
            .appendField("shape");
        this.setPreviousStatement(true, "Solid");
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setColour(20);
        this.setTooltip('');
        this.setInputsInline(false);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_translate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("translate");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z");
        this.setColour(65);
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_scale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("scale");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z");
        this.setColour(65);
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_subtract'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("subtract");
        this.appendStatementInput("Object");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_union'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("union");
        this.appendStatementInput("Object");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_intersect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("intersect");
        this.appendStatementInput("Shape");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Transform", "Operation"]);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_rotate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rotate")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "Axis");
        this.appendDummyInput()
            .appendField("angle")
            .appendField(new Blockly.FieldAngle("0"), "Angle");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('rotate the solid along the x, y, or z axis.');
        this.setInputsInline(false);
        this.setPreviousStatement(true, ["Operation", "Transform", "Solid"]);
        this.setNextStatement(true, ["Operation", "Transform"]);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_color'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("color")
            .appendField(new Blockly.FieldColour("#ff0000"), "Color");
        this.appendStatementInput("Shape")
            .setCheck(["Solid", "Operation", "Modifier"]);
        this.setPreviousStatement(true, "Modifier");
        this.setNextStatement(true, "Transform");
        this.setColour(120);
        this.setInputsInline(false);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_rectangle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rectangle");
        this.appendValueInput("width")
            .setCheck("Number")
            .appendField("width");
        this.appendValueInput("height")
            .setCheck("Number")
            .appendField("height");
        this.setOutput(true, "Shape");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_circle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("circle");
        this.appendValueInput("radius")
            .setCheck("Number")
            .appendField("radius");
        this.setOutput(true, "Shape");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_encapsulate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("encapsulate");
        this.appendStatementInput("Child");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('Encapsulate a solid so that it can be used in another block.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['cad_array'] = {
    init: function () {
        this.appendValueInput("Index")
            .setCheck("Number")
            .appendField("array ")
            .appendField(new Blockly.FieldVariable("index"), "Index")
            .appendField("size");
        this.appendStatementInput("Contents");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};