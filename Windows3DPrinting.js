﻿var Windows3DPrinting = {};

(function () {
    "use strict";
    var cadProcessor = null,
        intSize = 4,
        floatSize = 8,
        taskRequestedAdded = false;

    function getVertices(vertexList) {
        var printing3D = Windows.Graphics.Printing3D;

        var mesh = new printing3D.Printing3DMesh();

        mesh.createVertexPositions(floatSize * 3 * vertexList.length);
        var buffer = mesh.getVertexPositions();

        var index = 0;

        var dataWriter = new Float64Array(buffer);

        vertexList.forEach(function (vertex) {
            dataWriter[index] = vertex.pos.x;
            index++;
            dataWriter[index] = vertex.pos.y;
            index++;
            dataWriter[index] = vertex.pos.z;
            index++;
        });

        mesh.vertexCount = vertexList.length;

        return mesh;
    }

    function getIndices(indices, mesh) {
        var printing3D = Windows.Graphics.Printing3D,
            description = {
            format: printing3D.Printing3DBufferFormat.R32G32B32A32Float,
            stride: 7
        };

        mesh.vertexPositionsDescription = description;

        mesh.createTriangleIndices(intSize * description.stride * indices.length);

        var buffer = mesh.getTriangleIndices();

        var dataWriter = new Float64Array(buffer);

        indices.forEach(function (index, indexPos) {
            dataWriter[indexPos] = index;
        });

        mesh.indexCount = indices.length;
    }

    function identity() {
        var identityMatrix = {};

        identityMatrix.m11 = 1.0;
        identityMatrix.m12 = 0.0;
        identityMatrix.m13 = 0.0;
        identityMatrix.m14 = 0.0;
        identityMatrix.m21 = 0.0;
        identityMatrix.m22 = 1.0;
        identityMatrix.m23 = 0.0;
        identityMatrix.m24 = 0.0;
        identityMatrix.m31 = 0.0;
        identityMatrix.m32 = 0.0;
        identityMatrix.m33 = 1.0;
        identityMatrix.m34 = 0.0;
        identityMatrix.m41 = 0.0;
        identityMatrix.m42 = 0.0;
        identityMatrix.m43 = 0.0;
        identityMatrix.m44 = 1.0;

        return identityMatrix;
    }

    function printHandler(args) {
        /// <summary>Create the Print package</summary>
        /// <param name="args" type="Windows.Graphics.Printing3D.Print3DTaskSourceRequestedArgs">the 3D print task source requested arguments</param>
        try {
            if (cadProcessor.currentObject === null) {
                return;
            }

            var printing3D = Windows.Graphics.Printing3D;

            var model = new printing3D.Printing3DModel();

            model.unit = printing3D.Printing3DModelUnit.Millimeter;

            var materialGroup = new printing3D.Printing3DBaseMaterialGroup(0);
            var material = new printing3D.Printing3DBaseMaterial();

            material.name = printing3D.Printing3DBaseMaterial.Pla;

            materialGroup.bases.append(material);

            model.material.baseGroups.append(materialGroup);

            var component = new printing3D.Printing3DComponent();

            var triangles = cadProcessor.currentObject.toTriangles();

            var vertices = [];
            var indices = [];

            triangles.forEach(function(triangle) {
                triangle.vertices.forEach(function(vertex) {
                    var index = vertices.indexOf(vertex);

                    if (index === -1) {
                        index = vertices.push(vertex) - 1;
                    }

                    indices.push(index);
                });
                indices.push(0);
                indices.push(0);
                indices.push(0);
                indices.push(0);
            });

            var mesh = getVertices(vertices);

            getIndices(indices, mesh);

            model.meshes.append(mesh);

            component.mesh = mesh;

            model.components.append(component);

            var componentWithMatrix = new printing3D.Printing3DComponentWithMatrix();

            componentWithMatrix.component = component;

            componentWithMatrix.matrix = identity();

            model.build.components.append(componentWithMatrix);



            var modelPackage = new printing3D.Printing3D3MFPackage();

            modelPackage.saveModelToPackageAsync(model).then(function () {
                args.setSource(modelPackage);
            }, function (error) {
                console.error("Error saving model to package: " + error);
            });

        } catch (error) {
            console.error("Error printing: " + error);
        }
    }

    function onPrintRequestCompleted(args) {
        console.log("Print request completed: " + args);
    }

    function onPrintRequestSubmitting(args) {
        console.log("Print request submitting: " + args);
    }

    function onTaskRequested(eventArgs) {
        ///<summary>Print task requested</summary>
        ///<param name="eventArgs" type="Windows.Graphics.Printing3D.Print3DTaskRequestedEventArgs">the 3D print task requested event arguments</param>

        var request = eventArgs.request;

        console.log("Print task requested.");

        var task = request.createTask("OpenJSCAD Model", "", printHandler);

        task.addEventListener("completed", onPrintRequestCompleted);
        task.addEventListener("submitting", onPrintRequestSubmitting);
    }

    function print3D() {
        ///<summary>Start a 3D Print on Windows 10</summary>

        var printing3D = Windows.Graphics.Printing3D;

        var print3DManager = printing3D.Print3DManager.getForCurrentView();

        if (!taskRequestedAdded) {
            print3DManager.addEventListener("taskrequested", onTaskRequested);
            taskRequestedAdded = true;
        }
        printing3D.Print3DManager.showPrintUIAsync().done(function () {
            console.log("Print UI shown.");
        }, function(error) {
            console.error("Error printing: " + error);
        });
    }

    function addButton(parent) {
        ///<summary>Add the print button</summary>
        var printButton = document.createElement("button");
        printButton.setAttribute("style", "position:absolute; left:5px; bottom:5px;");
        var icon = document.createElement("span");
        icon.setAttribute("style", "font-family: Segoe MDL2 Assets; font-size:24pt;");
        icon.appendChild(document.createTextNode(""));//"&#xE2F7;"));
        printButton.appendChild(icon);
        printButton.appendChild(document.createElement("br"));
        printButton.appendChild(document.createTextNode("Print"));
        printButton.onclick = print3D;

        parent.appendChild(printButton);
    }

    Windows3DPrinting.initialize = function (processor) {
        /// <summary>Add the 3D print button if running on Windows 10 as a 
        /// hosted web app.</summary>
        if (typeof Windows === "undefined") {
            // this should only run inside a Windows 10 hosted web app.
            return;
        }

        MSApp.clearTemporaryWebDataAsync();

        cadProcessor = processor;

        addButton(processor.statusbuttons);
    }
})();

