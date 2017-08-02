"use strict"

class Neuron {
    
    constructor (importedData) {
        if (importedData) {
            this.imported = true
            this.weights = importedData.weights || []
            this.bias = importedData.bias
        }
    }

    init (size, {adaptiveLR, activationConfig, eluAlpha}={}) {

        this.deltaWeights = this.weights.map(v => 0)

        switch (adaptiveLR) {
            
            case "gain":
                this.weightGains = [...new Array(size)].map(v => 1)
                this.biasGain = 1
                break

            case "adagrad":
            case "rmsprop":
            case "adadelta":
                this.biasCache = 0
                this.weightsCache = [...new Array(size)].map(v => 0)

                if (adaptiveLR=="adadelta") {
                    this.adadeltaCache = [...new Array(size)].map(v => 0)
                    this.adadeltaBiasCache = 0
                }
                break

            case "adam":
                this.m = 0
                this.v = 0
                break
        }

        if (activationConfig=="rrelu") {
            this.rreluSlope = Math.random() * 0.001
            
        } else if (activationConfig=="elu") {
            this.eluAlpha = eluAlpha
        }
    }
}

typeof window=="undefined" && (exports.Neuron = Neuron)