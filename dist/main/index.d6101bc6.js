
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
//import { openDB } from 'idb';
var $a227f0f1258db640$exports = {};
(function(GLOBAL) {
    "use strict";
    var Big, /************************************** EDITABLE DEFAULTS *****************************************/ // The default values below must be integers within the stated ranges.
    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */ DP = 20, /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */ RM = 1, // The maximum value of DP and Big.DP.
    MAX_DP = 1E6, // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6, /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */ NE = -7, /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */ PE = 21, /*
     * When true, an error will be thrown if a primitive number is passed to the Big constructor,
     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
     * primitive number without a loss of precision.
     */ STRICT = false, /**************************************************************************************************/ // Error messages.
    NAME = "[big.js] ", INVALID = NAME + "Invalid ", INVALID_DP = INVALID + "decimal places", INVALID_RM = INVALID + "rounding mode", DIV_BY_ZERO = NAME + "Division by zero", // The shared prototype object.
    P = {}, UNDEFINED = void 0, NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    /*
   * Create and return a Big constructor.
   */ function _Big_() {
        /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */ function Big(n) {
            var x = this;
            // Enable constructor usage without new.
            if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
            // Duplicate.
            if (n instanceof Big) {
                x.s = n.s;
                x.e = n.e;
                x.c = n.c.slice();
            } else {
                if (typeof n !== "string") {
                    if (Big.strict === true && typeof n !== "bigint") throw TypeError(INVALID + "value");
                    // Minus zero?
                    n = n === 0 && 1 / n < 0 ? "-0" : String(n);
                }
                parse(x, n);
            }
            // Retain a reference to this Big constructor.
            // Shadow Big.prototype.constructor which points to Object.
            x.constructor = Big;
        }
        Big.prototype = P;
        Big.DP = DP;
        Big.RM = RM;
        Big.NE = NE;
        Big.PE = PE;
        Big.strict = STRICT;
        Big.roundDown = 0;
        Big.roundHalfUp = 1;
        Big.roundHalfEven = 2;
        Big.roundUp = 3;
        return Big;
    }
    /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */ function parse(x, n) {
        var e, i, nl;
        if (!NUMERIC.test(n)) throw Error(INVALID + "number");
        // Determine sign.
        x.s = n.charAt(0) == "-" ? (n = n.slice(1), -1) : 1;
        // Decimal point?
        if ((e = n.indexOf(".")) > -1) n = n.replace(".", "");
        // Exponential form?
        if ((i = n.search(/e/i)) > 0) {
            // Determine exponent.
            if (e < 0) e = i;
            e += +n.slice(i + 1);
            n = n.substring(0, i);
        } else if (e < 0) // Integer.
        e = n.length;
        nl = n.length;
        // Determine leading zeros.
        for(i = 0; i < nl && n.charAt(i) == "0";)++i;
        if (i == nl) // Zero.
        x.c = [
            x.e = 0
        ];
        else {
            // Determine trailing zeros.
            for(; nl > 0 && n.charAt(--nl) == "0";);
            x.e = e - i - 1;
            x.c = [];
            // Convert string to array of digits without leading/trailing zeros.
            for(e = 0; i <= nl;)x.c[e++] = +n.charAt(i++);
        }
        return x;
    }
    /*
   * Round Big x to a maximum of sd significant digits using rounding mode rm.
   *
   * x {Big} The Big to round.
   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   * [more] {boolean} Whether the result of division was truncated.
   */ function round(x, sd, rm, more) {
        var xc = x.c;
        if (rm === UNDEFINED) rm = x.constructor.RM;
        if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) throw Error(INVALID_RM);
        if (sd < 1) {
            more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
            xc.length = 1;
            if (more) {
                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                x.e = x.e - sd + 1;
                xc[0] = 1;
            } else // Zero.
            xc[0] = x.e = 0;
        } else if (sd < xc.length) {
            // xc[sd] is the digit after the digit that may be rounded up.
            more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
            // Remove any digits after the required precision.
            xc.length = sd;
            // Round up?
            if (more) // Rounding up may mean the previous digit has to be rounded up.
            for(; ++xc[--sd] > 9;){
                xc[sd] = 0;
                if (sd === 0) {
                    ++x.e;
                    xc.unshift(1);
                    break;
                }
            }
            // Remove trailing zeros.
            for(sd = xc.length; !xc[--sd];)xc.pop();
        }
        return x;
    }
    /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   */ function stringify(x, doExponential, isNonzero) {
        var e = x.e, s = x.c.join(""), n = s.length;
        // Exponential notation?
        if (doExponential) s = s.charAt(0) + (n > 1 ? "." + s.slice(1) : "") + (e < 0 ? "e" : "e+") + e;
        else if (e < 0) {
            for(; ++e;)s = "0" + s;
            s = "0." + s;
        } else if (e > 0) {
            if (++e > n) for(e -= n; e--;)s += "0";
            else if (e < n) s = s.slice(0, e) + "." + s.slice(e);
        } else if (n > 1) s = s.charAt(0) + "." + s.slice(1);
        return x.s < 0 && isNonzero ? "-" + s : s;
    }
    // Prototype/instance methods
    /*
   * Return a new Big whose value is the absolute value of this Big.
   */ P.abs = function() {
        var x = new this.constructor(this);
        x.s = 1;
        return x;
    };
    /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
   */ P.cmp = function(y) {
        var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
        // Either zero?
        if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
        // Signs differ?
        if (i != j) return i;
        isneg = i < 0;
        // Compare exponents.
        if (k != l) return k > l ^ isneg ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        // Compare digit by digit.
        for(i = -1; ++i < j;){
            if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
        }
        // Compare lengths.
        return k == l ? 0 : k > l ^ isneg ? 1 : -1;
    };
    /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */ P.div = function(y) {
        var x = this, Big = x.constructor, a = x.c, b = (y = new Big(y)).c, k = x.s == y.s ? 1 : -1, dp = Big.DP;
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
        // Divisor is zero?
        if (!b[0]) throw Error(DIV_BY_ZERO);
        // Dividend is 0? Return +-0.
        if (!a[0]) {
            y.s = k;
            y.c = [
                y.e = 0
            ];
            return y;
        }
        var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, p = dp + (q.e = x.e - y.e) + 1; // precision of the result
        q.s = k;
        k = p < 0 ? 0 : p;
        // Create version of divisor with leading zero.
        bz.unshift(0);
        // Add zeros to make remainder as long as divisor.
        for(; rl++ < bl;)r.push(0);
        do {
            // n is how many times the divisor goes into current remainder.
            for(n = 0; n < 10; n++){
                // Compare divisor and remainder.
                if (bl != (rl = r.length)) cmp = bl > rl ? 1 : -1;
                else {
                    for(ri = -1, cmp = 0; ++ri < bl;)if (b[ri] != r[ri]) {
                        cmp = b[ri] > r[ri] ? 1 : -1;
                        break;
                    }
                }
                // If divisor < remainder, subtract divisor from remainder.
                if (cmp < 0) {
                    // Remainder can't be more than 1 digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for(bt = rl == bl ? b : bz; rl;){
                        if (r[--rl] < bt[rl]) {
                            ri = rl;
                            for(; ri && !r[--ri];)r[ri] = 9;
                            --r[ri];
                            r[rl] += 10;
                        }
                        r[rl] -= bt[rl];
                    }
                    for(; !r[0];)r.shift();
                } else break;
            }
            // Add the digit n to the result array.
            qc[qi++] = cmp ? n : ++n;
            // Update the remainder.
            if (r[0] && cmp) r[rl] = a[ai] || 0;
            else r = [
                a[ai]
            ];
        }while ((ai++ < al || r[0] !== UNDEFINED) && k--);
        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if (!qc[0] && qi != 1) {
            // There can't be more than one zero.
            qc.shift();
            q.e--;
            p--;
        }
        // Round?
        if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
        return q;
    };
    /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */ P.eq = function(y) {
        return this.cmp(y) === 0;
    };
    /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */ P.gt = function(y) {
        return this.cmp(y) > 0;
    };
    /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */ P.gte = function(y) {
        return this.cmp(y) > -1;
    };
    /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */ P.lt = function(y) {
        return this.cmp(y) < 0;
    };
    /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */ P.lte = function(y) {
        return this.cmp(y) < 1;
    };
    /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */ P.minus = P.sub = function(y) {
        var i, j, t, xlty, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.plus(y);
        }
        var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
        // Either zero?
        if (!xc[0] || !yc[0]) {
            if (yc[0]) y.s = -b;
            else if (xc[0]) y = new Big(x);
            else y.s = 1;
            return y;
        }
        // Determine which is the bigger number. Prepend zeros to equalise exponents.
        if (a = xe - ye) {
            if (xlty = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }
            t.reverse();
            for(b = a; b--;)t.push(0);
            t.reverse();
        } else {
            // Exponents equal. Check digit by digit.
            j = ((xlty = xc.length < yc.length) ? xc : yc).length;
            for(a = b = 0; b < j; b++)if (xc[b] != yc[b]) {
                xlty = xc[b] < yc[b];
                break;
            }
        }
        // x < y? Point xc to the array of the bigger number.
        if (xlty) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }
        /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */ if ((b = (j = yc.length) - (i = xc.length)) > 0) for(; b--;)xc[i++] = 0;
        // Subtract yc from xc.
        for(b = i; j > a;){
            if (xc[--j] < yc[j]) {
                for(i = j; i && !xc[--i];)xc[i] = 9;
                --xc[i];
                xc[j] += 10;
            }
            xc[j] -= yc[j];
        }
        // Remove trailing zeros.
        for(; xc[--b] === 0;)xc.pop();
        // Remove leading zeros and adjust exponent accordingly.
        for(; xc[0] === 0;){
            xc.shift();
            --ye;
        }
        if (!xc[0]) {
            // n - n = +0
            y.s = 1;
            // Result must be zero.
            xc = [
                ye = 0
            ];
        }
        y.c = xc;
        y.e = ye;
        return y;
    };
    /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */ P.mod = function(y) {
        var ygtx, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
        if (!y.c[0]) throw Error(DIV_BY_ZERO);
        x.s = y.s = 1;
        ygtx = y.cmp(x) == 1;
        x.s = a;
        y.s = b;
        if (ygtx) return new Big(x);
        a = Big.DP;
        b = Big.RM;
        Big.DP = Big.RM = 0;
        x = x.div(y);
        Big.DP = a;
        Big.RM = b;
        return this.minus(x.times(y));
    };
    /*
   * Return a new Big whose value is the value of this Big negated.
   */ P.neg = function() {
        var x = new this.constructor(this);
        x.s = -x.s;
        return x;
    };
    /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */ P.plus = P.add = function(y) {
        var e, k, t, x = this, Big = x.constructor;
        y = new Big(y);
        // Signs differ?
        if (x.s != y.s) {
            y.s = -y.s;
            return x.minus(y);
        }
        var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
        // Either zero?
        if (!xc[0] || !yc[0]) {
            if (!yc[0]) {
                if (xc[0]) y = new Big(x);
                else y.s = x.s;
            }
            return y;
        }
        xc = xc.slice();
        // Prepend zeros to equalise exponents.
        // Note: reverse faster than unshifts.
        if (e = xe - ye) {
            if (e > 0) {
                ye = xe;
                t = yc;
            } else {
                e = -e;
                t = xc;
            }
            t.reverse();
            for(; e--;)t.push(0);
            t.reverse();
        }
        // Point xc to the longer array.
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }
        e = yc.length;
        // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
        for(k = 0; e; xc[e] %= 10)k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
        // No need to check for zero, as +x + +y != 0 && -x + -y != 0
        if (k) {
            xc.unshift(k);
            ++ye;
        }
        // Remove trailing zeros.
        for(e = xc.length; xc[--e] === 0;)xc.pop();
        y.c = xc;
        y.e = ye;
        return y;
    };
    /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */ P.pow = function(n) {
        var x = this, one = new x.constructor("1"), y = one, isneg = n < 0;
        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) throw Error(INVALID + "exponent");
        if (isneg) n = -n;
        for(;;){
            if (n & 1) y = y.times(x);
            n >>= 1;
            if (!n) break;
            x = x.times(x);
        }
        return isneg ? one.div(y) : y;
    };
    /*
   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
   * significant digits using rounding mode rm, or Big.RM if rm is not specified.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.prec = function(sd, rm) {
        if (sd !== ~~sd || sd < 1 || sd > MAX_DP) throw Error(INVALID + "precision");
        return round(new this.constructor(this), sd, rm);
    };
    /*
   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
   * using rounding mode rm, or Big.RM if rm is not specified.
   * If dp is negative, round to an integer which is a multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.round = function(dp, rm) {
        if (dp === UNDEFINED) dp = 0;
        else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) throw Error(INVALID_DP);
        return round(new this.constructor(this), dp + this.e + 1, rm);
    };
    /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */ P.sqrt = function() {
        var r, c, t, x = this, Big = x.constructor, s = x.s, e = x.e, half = new Big("0.5");
        // Zero?
        if (!x.c[0]) return new Big(x);
        // Negative?
        if (s < 0) throw Error(NAME + "No square root");
        // Estimate.
        s = Math.sqrt(x + "");
        // Math.sqrt underflow/overflow?
        // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
        if (s === 0 || s === 1 / 0) {
            c = x.c.join("");
            if (!(c.length + e & 1)) c += "0";
            s = Math.sqrt(c);
            e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
            r = new Big((s == 1 / 0 ? "5e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + e);
        } else r = new Big(s + "");
        e = r.e + (Big.DP += 4);
        // Newton-Raphson iteration.
        do {
            t = r;
            r = half.times(t.plus(x.div(t)));
        }while (t.c.slice(0, e).join("") !== r.c.slice(0, e).join(""));
        return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
    };
    /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */ P.times = P.mul = function(y) {
        var c, x = this, Big = x.constructor, xc = x.c, yc = (y = new Big(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
        // Determine sign of result.
        y.s = x.s == y.s ? 1 : -1;
        // Return signed 0 if either 0.
        if (!xc[0] || !yc[0]) {
            y.c = [
                y.e = 0
            ];
            return y;
        }
        // Initialise exponent of result as x.e + y.e.
        y.e = i + j;
        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
        if (a < b) {
            c = xc;
            xc = yc;
            yc = c;
            j = a;
            a = b;
            b = j;
        }
        // Initialise coefficient array of result with zeros.
        for(c = new Array(j = a + b); j--;)c[j] = 0;
        // Multiply.
        // i is initially xc.length.
        for(i = b; i--;){
            b = 0;
            // a is yc.length.
            for(j = a + i; j > i;){
                // Current sum of products at this digit position, plus carry.
                b = c[j] + yc[i] * xc[j - i - 1] + b;
                c[j--] = b % 10;
                // carry
                b = b / 10 | 0;
            }
            c[j] = b;
        }
        // Increment result exponent if there is a final carry, otherwise remove leading zero.
        if (b) ++y.e;
        else c.shift();
        // Remove trailing zeros.
        for(i = c.length; !c[--i];)c.pop();
        y.c = c;
        return y;
    };
    /*
   * Return a string representing the value of this Big in exponential notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.toExponential = function(dp, rm) {
        var x = this, n = x.c[0];
        if (dp !== UNDEFINED) {
            if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
            x = round(new x.constructor(x), ++dp, rm);
            for(; x.c.length < dp;)x.c.push(0);
        }
        return stringify(x, true, !!n);
    };
    /*
   * Return a string representing the value of this Big in normal notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */ P.toFixed = function(dp, rm) {
        var x = this, n = x.c[0];
        if (dp !== UNDEFINED) {
            if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
            x = round(new x.constructor(x), dp + x.e + 1, rm);
            // x.e may have changed if the value is rounded up.
            for(dp = dp + x.e + 1; x.c.length < dp;)x.c.push(0);
        }
        return stringify(x, false, !!n);
    };
    /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */ P.toJSON = P.toString = function() {
        var x = this, Big = x.constructor;
        return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
    };
    /*
   * Return the value of this Big as a primitve number.
   */ P.toNumber = function() {
        var n = Number(stringify(this, true, true));
        if (this.constructor.strict === true && !this.eq(n.toString())) throw Error(NAME + "Imprecise conversion");
        return n;
    };
    /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * rounding mode rm, or Big.RM if rm is not specified.
   * Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.toPrecision = function(sd, rm) {
        var x = this, Big = x.constructor, n = x.c[0];
        if (sd !== UNDEFINED) {
            if (sd !== ~~sd || sd < 1 || sd > MAX_DP) throw Error(INVALID + "precision");
            x = round(new Big(x), sd, rm);
            for(; x.c.length < sd;)x.c.push(0);
        }
        return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
    };
    /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */ P.valueOf = function() {
        var x = this, Big = x.constructor;
        if (Big.strict === true) throw Error(NAME + "valueOf disallowed");
        return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
    };
    // Export
    Big = _Big_();
    Big["default"] = Big.Big = Big;
    //AMD.
    if (typeof define === "function" && define.amd) define(function() {
        return Big;
    });
    else if (0, $a227f0f1258db640$exports) $a227f0f1258db640$exports = Big;
    else GLOBAL.Big = Big;
})($a227f0f1258db640$exports);


function $134d19e749bf0414$export$3988ae62b71be9a3(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function $134d19e749bf0414$export$3205c97bcf96f7dc(...parts) {
    // Convert the components to strings.
    let sparts = parts.map((part)=>part.toString());
    // Join the parts with a hyphen.
    let id = sparts.join("-");
    // Replace any character that is not a letter (upper or lower case), a digit, a hyphen, or an underscore 
    // with an underscore. 
    let validId = id.replace(/[^a-zA-Z-_0-9]/g, "_");
    // If the first character is a digit, two hyphens, or a hyphen followed by a digit, add an underscore to 
    // the beginning of the ID.
    if (/^[0-9]|^--|-^[0-9]/.test(validId)) validId = "_" + validId;
    return validId;
}
function $134d19e749bf0414$export$bd2782c820638828(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}
function $134d19e749bf0414$export$dc22ec7f8e0b9ac(map, delimiter) {
    if (map == null) return "";
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
}
function $134d19e749bf0414$export$4323cc4280d5be7(array, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function $134d19e749bf0414$export$736cc24a423eb64d(set, delimiter) {
    if (delimiter == undefined) delimiter = ", ";
    return Array.from(set).map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function $134d19e749bf0414$export$8cfbaad830aa9e0a(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(s[i]));
    return r;
}
function $134d19e749bf0414$export$e90fb89750dba83f(s) {
    try {
        let x = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(s);
        return true;
    } catch (e) {
        return false;
    }
}
function $134d19e749bf0414$export$dba422ef505af222(s, delimiter) {
    if (delimiter == undefined) delimiter = " ";
    return s.map((value)=>value.toString()).join(delimiter);
}
function $134d19e749bf0414$export$8960430cfd85939f(x, y) {
    if (x == null) return y;
    if (x.lt(y)) return y;
    return x;
}
function $134d19e749bf0414$export$96ec731ed4dcb222(x, y) {
    if (x == null) return y;
    if (x.gt(y)) return y;
    return x;
}



const $f0396edd0a5c99f7$export$25280bc3a7ce098e = "button";
const $f0396edd0a5c99f7$export$5117a7844205b9ac = "collapsible";
const $f0396edd0a5c99f7$export$38aa1ab9c2935930 = "\u25BC"; // ▼
const $f0396edd0a5c99f7$export$e5e81646ee331a9e = "\u25B2"; // ▲
const $f0396edd0a5c99f7$export$8797b0c8298d191 = "select";
function $f0396edd0a5c99f7$export$8b2cd46c11844202(id, divToAddTo, elementToInsertBefore, content, buttonLabel, componentMargin, margin) {
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(id, margin);
    let buttonId = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, $f0396edd0a5c99f7$export$25280bc3a7ce098e);
    let button = $f0396edd0a5c99f7$export$9b6d6ca62970729f(buttonLabel + " " + $f0396edd0a5c99f7$export$38aa1ab9c2935930, buttonId, componentMargin);
    button.className = $f0396edd0a5c99f7$export$5117a7844205b9ac;
    button.addEventListener("click", function() {
        let parts = button.textContent.split(" ");
        parts[parts.length - 1] = parts[parts.length - 1] === $f0396edd0a5c99f7$export$38aa1ab9c2935930 ? $f0396edd0a5c99f7$export$e5e81646ee331a9e : $f0396edd0a5c99f7$export$38aa1ab9c2935930;
        button.textContent = parts.join(" ");
    });
    div.appendChild(button);
    div.appendChild(content);
    if (elementToInsertBefore != null) divToAddTo.insertBefore(div, elementToInsertBefore);
    else divToAddTo.appendChild(div);
    $f0396edd0a5c99f7$var$setCollapsibleEventListener(button);
    return div;
}
/**
 * For setting the event listener for a collapsible element.
 * @param e The element to add the event listener to.
 */ function $f0396edd0a5c99f7$var$setCollapsibleEventListener(e) {
    // Remove any existing event listener.
    e.removeEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
    // Add new event listener.
    e.addEventListener("click", $f0396edd0a5c99f7$var$toggleCollapsible);
}
/**
 * For toggling the collapsible content.
 */ function $f0396edd0a5c99f7$var$toggleCollapsible() {
    this.classList.toggle("active");
    let nes = this.nextElementSibling;
    if (nes != null) {
        if (nes instanceof HTMLDivElement) {
            if (nes.style.display === "block") nes.style.display = "none";
            else nes.style.display = "block";
        } else console.log("toggleCollapsible: nextElementSibling is not an HTMLDivElement");
    } else console.log("toggleCollapsible: nextElementSibling is null");
}
function $f0396edd0a5c99f7$export$4e9ec2b27757d9dd(type, id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let input = $f0396edd0a5c99f7$export$cef1adc173ab7099(type, id, componentMargin, func, value);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}
function $f0396edd0a5c99f7$export$cef1adc173ab7099(type, id, margin, func, value) {
    let input = $f0396edd0a5c99f7$export$d80fffb1deb3b97e(type, id, margin);
    input.onchange = func;
    input.value = value;
    $f0396edd0a5c99f7$export$d43d96a9a8ad3e51(input);
    return input;
}
function $f0396edd0a5c99f7$export$d80fffb1deb3b97e(type, id, margin) {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.style.fontSize = "1em"; // Set the font size with a relative unit.
    input.classList.add("auto-width");
    return input;
}
function $f0396edd0a5c99f7$export$60fee6710ef6fb16(id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let ta = $f0396edd0a5c99f7$export$857bcd29dc5afb77(id, componentMargin, func, value);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(ta);
    return div;
}
function $f0396edd0a5c99f7$export$857bcd29dc5afb77(id, margin, func, value) {
    let ta = $f0396edd0a5c99f7$export$5b32cb28d9a29894(id, margin);
    ta.onchange = func;
    ta.value = value;
    $f0396edd0a5c99f7$export$c5eaaac137ef25d0(ta);
    return ta;
}
function $f0396edd0a5c99f7$export$5b32cb28d9a29894(id, margin) {
    let ta = document.createElement("textarea");
    ta.id = id;
    Object.assign(ta.style, margin);
    ta.style.fontSize = "1em"; // Set the font size with a relative unit.
    ta.classList.add("auto-width");
    return ta;
}
function $f0396edd0a5c99f7$export$ff083c49da8fe0f9(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + '="' + value + '"';
    return s + " />";
}
function $f0396edd0a5c99f7$export$d43d96a9a8ad3e51(i, minSize) {
    if (minSize == undefined) minSize = 4;
    i.style.width = i.value.length + minSize + "ch";
}
function $f0396edd0a5c99f7$export$fdd146df37959fe8(s, minSize) {
    if (minSize == undefined) minSize = 6;
    s.style.width = s.value.length + minSize + "ch";
}
function $f0396edd0a5c99f7$export$c5eaaac137ef25d0(ta, minSize) {
    if (minSize == undefined) minSize = 6;
    ta.style.width = ta.value.length + minSize + "ch";
}
function $f0396edd0a5c99f7$export$b89bf4b169286865(options, name, value, id, margin) {
    let select = document.createElement("select");
    options.forEach((option)=>{
        select.name = name;
        select.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.value = value;
    select.style.fontSize = "1em"; // Set the font size with a relative unit.
    select.classList.add("auto-width");
    $f0396edd0a5c99f7$export$fdd146df37959fe8(select);
    Object.assign(select.style, margin);
    return select;
}
function $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4(textContent, options, name, value, id, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(id, divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(textContent, componentMargin);
    div.appendChild(label);
    div.appendChild($f0396edd0a5c99f7$export$b89bf4b169286865(options, name, value, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, $f0396edd0a5c99f7$export$8797b0c8298d191), componentMargin));
    return div;
}
function $f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, id, boundary) {
    let button = document.createElement("button");
    button.textContent = textContent;
    if (id != undefined) button.id = id;
    if (boundary != undefined) Object.assign(button.style, boundary);
    button.style.fontSize = "1em"; // Set the font size with a relative unit.
    return button;
}
function $f0396edd0a5c99f7$export$717b1c3df34dc89e(labeltext, textContent, id, componentMargin, divMargin) {
    let div = $f0396edd0a5c99f7$export$78253536c0178a32(undefined, divMargin);
    let label = $f0396edd0a5c99f7$export$f2839682b8c07f35(labeltext, componentMargin);
    label.htmlFor = id;
    Object.assign(label.style, componentMargin);
    div.appendChild(label);
    div.appendChild($f0396edd0a5c99f7$export$9b6d6ca62970729f(textContent, id, componentMargin));
    return div;
}
function $f0396edd0a5c99f7$export$331ff980f0d45cff(id, margin) {
    let div = document.createElement("div");
    if (id != undefined) div.id = id;
    if (margin != undefined) Object.assign(div.style, margin);
    return div;
}
function $f0396edd0a5c99f7$export$78253536c0178a32(id, margin) {
    let div = $f0396edd0a5c99f7$export$331ff980f0d45cff(id, margin);
    div.style.display = "flex";
    div.style.flexWrap = "wrap";
    //div.classList.add('auto-width-flex');
    return div;
}
function $f0396edd0a5c99f7$export$f2839682b8c07f35(textContent, margin) {
    let label = document.createElement("label");
    Object.assign(label.style, margin);
    label.textContent = textContent;
    label.style.fontSize = "1em"; // Set the font size with a relative unit.
    return label;
}
function $f0396edd0a5c99f7$export$33bbb3ec7652e187(id, margin) {
    let table = document.createElement("table");
    table.id = id;
    Object.assign(table.style, margin);
    return table;
}
function $f0396edd0a5c99f7$export$67d0e2fae00985e1(table, content) {
    let row = table.insertRow();
    content.forEach((c)=>{
        row.insertCell().textContent = c;
    });
    return row;
}



function $cc8c7201a9bad777$export$735ee1799fd02602(xml, name) {
    let v = xml.getAttribute(name);
    if (!v) throw new Error(name + " attribute not found");
    return v;
}
function $cc8c7201a9bad777$export$91e73a91db22e6a2(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
    if (el == null) throw new Error(tagName + " element not found");
    return el;
}
function $cc8c7201a9bad777$export$4e07613bf412feb7(element) {
    let cn = element.childNodes;
    if (cn == null) throw new Error("Element has no childNodes");
    return cn[0];
}
function $cc8c7201a9bad777$export$13cb40e9b656ab9e(node) {
    let nodeValue = node.nodeValue;
    if (nodeValue == null) throw new Error("nodeValue is null");
    return nodeValue;
}
function $cc8c7201a9bad777$export$433c819efd6b1ea5(e) {
    let s;
    let firstChildNode = $cc8c7201a9bad777$export$4e07613bf412feb7(e);
    if (firstChildNode) s = $cc8c7201a9bad777$export$13cb40e9b656ab9e(firstChildNode).trim();
    else s = "";
    return s;
}
class $cc8c7201a9bad777$export$3288d34c523a1192 {
    /**
     * @param tagName The tag name.
     */ constructor(tagName){
        this.tagName = tagName;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * Whilst not strictly XML, some consider self closing tags as XML.
     * @param padding The padding (optional).
     * @returns A self closing tag.
     */ toXML(padding) {
        let s = (0, $f0396edd0a5c99f7$export$ff083c49da8fe0f9)(undefined, this.tagName);
        if (padding) return "\n" + padding + s;
        return s;
    }
}
class $cc8c7201a9bad777$export$ca4ceee82ec565dc extends $cc8c7201a9bad777$export$3288d34c523a1192 {
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tagName){
        super(tagName);
        this.attributes = attributes;
    }
    /**
     * @returns A string representation.
     */ toString() {
        let r = this.tagName + `(`;
        if (this.attributes) this.attributes.forEach((value, key)=>{
            r += `${key}(${value}), `;
        });
        return r;
    }
    /**
     * Get an XML like representation that instead of having a closing tag is a self closing tag.
     * These are allowed and perhaps expected in MESMER XML format.
     * @param {string} padding The padding (Optional).
     * @returns An XML like representation.
     */ toXML(padding) {
        let s = "";
        if (padding != undefined) s += "\n" + padding;
        s += "<" + this.tagName;
        for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
        return s + " />";
    }
}
class $cc8c7201a9bad777$export$8f67221c6fb2ad09 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.trim(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$82583fad49645fc9 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName);
        this.value = value;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.value.toString()})`;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0(this.value.toString(), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$38d8ebe2767f8865 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName);
        /**
     * The delimiter of the values.
     */ this.delimiter = " ";
        this.values = values;
        if (delimiter != undefined) this.delimiter = delimiter;
    }
    /**
     * @returns The values.
     */ getValues() {
        return this.values;
    }
    /**
     * @returns A string representation.
     */ setValues(values) {
        this.values = values;
    }
    /**
     * @returns A string representation.
     */ toString() {
        return super.toString() + `, ${this.values.toString()})`;
    }
    /**
     * Set the delimiter.
     * @param delimiter The delimiter.
     */ setDelimiter(delimiter) {
        this.delimiter = delimiter;
    }
    /**
     * Get the XML representation.
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(padding) {
        return $cc8c7201a9bad777$export$dad497fe1f6e27c0((0, $134d19e749bf0414$export$dba422ef505af222)(this.values, this.delimiter), this.tagName, this.attributes, padding, false);
    }
}
class $cc8c7201a9bad777$export$bd431b64ad3b0433 extends $cc8c7201a9bad777$export$ca4ceee82ec565dc {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     */ constructor(attributes, tagName){
        super(attributes, tagName);
        this.nodes = new Map();
    }
    /**
     * Add a node.
     * @param {Tag | TagWithAttributes | NodeWithNodes} node The node.
     * @returns The index of the node added.
     */ addNode(node) {
        this.nodes.set(this.nodes.size, node);
    }
    /**
     * @returns A string representation.
     */ toString() {
        let s = super.toString();
        this.nodes.forEach((v, k)=>{
            s += `, ${v.toString()}`;
        });
        return s + ")";
    }
    /**
     * Get the XML representation.
     * @param pad The pad (Optional).
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */ toXML(pad, padding) {
        let padding1;
        if (pad != undefined && padding != undefined) padding1 = padding + pad;
        let s = "";
        if (this.nodes.size > 0) {
            let i = 0;
            this.nodes.forEach((v)=>{
                if (v == undefined) console.warn("Node " + i.toString() + " is undefined this.nodes.size = " + this.nodes.size);
                else {
                    if (v instanceof $cc8c7201a9bad777$export$bd431b64ad3b0433) s += v.toXML(pad, padding1);
                    else if (v instanceof $cc8c7201a9bad777$export$ca4ceee82ec565dc) s += v.toXML(padding1);
                    else s += v.toXML(padding1);
                }
            });
            return $cc8c7201a9bad777$export$dad497fe1f6e27c0(s, this.tagName, this.attributes, padding, true);
        } else {
            let s = (0, $f0396edd0a5c99f7$export$ff083c49da8fe0f9)(this.attributes, this.tagName);
            if (padding != undefined) return "\n" + padding + s;
            return s;
        }
    }
}
function $cc8c7201a9bad777$export$2cd488e9ab180ce2(tagName, attributes, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += "<" + tagName;
    if (attributes) for (let [k, v] of attributes)s += " " + k + '="' + v.toString() + '"';
    return s + ">";
}
function $cc8c7201a9bad777$export$34b7e1ae786b72b0(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + "</" + tagName + ">";
}
function $cc8c7201a9bad777$export$dad497fe1f6e27c0(content, tagName, attributes, padding, padValue) {
    let startTag = $cc8c7201a9bad777$export$2cd488e9ab180ce2(tagName, attributes, padding);
    let endTag = $cc8c7201a9bad777$export$34b7e1ae786b72b0(tagName, padding, padValue);
    return startTag + content + endTag;
}
function $cc8c7201a9bad777$export$fe94072fee8a6976(element) {
    let attributeNames = element.getAttributeNames();
    let attributes = new Map();
    attributeNames.forEach(function(attributeName) {
        let attributeValue = element.getAttribute(attributeName);
        if (attributeValue != null) attributes.set(attributeName.trim(), attributeValue.trim());
    });
    return attributes;
}
function $cc8c7201a9bad777$export$b7531b8ff18dc588(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    return e[0];
}





class $955343e59cd8f503$export$d0e9917d83c120a0 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the lower attribute.
     */ this.s_lower = "lower";
    }
    static{
        /**
     * The key for the upper attribute.
     */ this.s_upper = "upper";
    }
    static{
        /**
     * The key for the stepsize attribute.
     */ this.s_stepsize = "stepsize";
    }
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName, value);
    }
    /**
     * @param value The value of the Range.
     */ setValue(value) {
        this.value = value;
    }
    /**
     * @returns The units of the Range.
     */ getUnits() {
        return this.attributes.get($955343e59cd8f503$export$d0e9917d83c120a0.s_units);
    }
    /**
     * @param units The units of the Range.
     */ setUnits(units) {
        this.attributes.set($955343e59cd8f503$export$d0e9917d83c120a0.s_units, units);
    }
    /**
     * Remove the units attribute.
     */ removeUnits() {
        this.attributes.delete($955343e59cd8f503$export$d0e9917d83c120a0.s_units);
    }
    /**
     * @returns The lower of the Range.
     */ getLower() {
        let lower = this.attributes.get($955343e59cd8f503$export$d0e9917d83c120a0.s_lower);
        if (lower != undefined) return new (0, $a227f0f1258db640$exports.Big)(lower);
    }
    /**
     * @param lower The lower of the Range.
     */ setLower(lower) {
        this.attributes.set($955343e59cd8f503$export$d0e9917d83c120a0.s_lower, lower.toString());
    }
    /**
     * Remove the lower attribute.
     */ removeLower() {
        this.attributes.delete($955343e59cd8f503$export$d0e9917d83c120a0.s_lower);
    }
    /**
     * @returns The upper of the Range.
     */ getUpper() {
        let upper = this.attributes.get($955343e59cd8f503$export$d0e9917d83c120a0.s_upper);
        if (upper != undefined) return new (0, $a227f0f1258db640$exports.Big)(upper);
    }
    /**
     * @param upper The upper of the Range.
     */ setUpper(upper) {
        this.attributes.set($955343e59cd8f503$export$d0e9917d83c120a0.s_upper, upper.toString());
    }
    /**
     * Remove the upper attribute.
     */ removeUpper() {
        this.attributes.delete($955343e59cd8f503$export$d0e9917d83c120a0.s_upper);
    }
    /**
     * @returns The stepsize of the Range.
     */ getStepsize() {
        let stepsize = this.attributes.get($955343e59cd8f503$export$d0e9917d83c120a0.s_stepsize);
        if (stepsize != undefined) return new (0, $a227f0f1258db640$exports.Big)(stepsize);
    }
    /**
     * @param stepsize The stepsize of the Range.
     */ setStepsize(stepsize) {
        this.attributes.set($955343e59cd8f503$export$d0e9917d83c120a0.s_stepsize, stepsize.toString());
    }
    /**
     * Remove the stepsize attribute.
     */ removeStepsize() {
        this.attributes.delete($955343e59cd8f503$export$d0e9917d83c120a0.s_stepsize);
    }
}






class $6bf90154944bce56$export$877cee35188549c7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:eigenvalue";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $6bf90154944bce56$export$877cee35188549c7.tagName, value);
    }
}
class $6bf90154944bce56$export$f681829d43cbf50e extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:eigenvalueList";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, eigenvalues){
        super(attributes, $6bf90154944bce56$export$f681829d43cbf50e.tagName);
        if (eigenvalues) eigenvalues.forEach((eigenvalue)=>{
            this.addNode(eigenvalue);
        });
    }
    /**
     * Add an eigenvalue.
     */ addEigenvalue(e) {
        this.addNode(e);
    }
}
class $6bf90154944bce56$export$910c21a5819ebc2e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:pop";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $6bf90154944bce56$export$910c21a5819ebc2e.tagName, value);
    }
}
class $6bf90154944bce56$export$9764fff2991ff94a extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:population";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, pops){
        super(attributes, $6bf90154944bce56$export$9764fff2991ff94a.tagName);
    }
    /**
     * Add a pop.
     */ addPop(p) {
        this.addNode(p);
    }
}
class $6bf90154944bce56$export$8f9a53be9a409418 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:populationList";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, populations){
        super(attributes, $6bf90154944bce56$export$8f9a53be9a409418.tagName);
        if (populations) populations.forEach((population)=>{
            this.addNode(population);
        });
    }
    /**
     * Add a population.
     */ addPopulation(p) {
        this.addNode(p);
    }
}
class $6bf90154944bce56$export$2450ca15ad4d2ed0 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:firstOrderLoss";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $6bf90154944bce56$export$2450ca15ad4d2ed0.tagName, value);
    }
}
class $6bf90154944bce56$export$984142e8329468e6 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:firstOrderRate";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $6bf90154944bce56$export$2450ca15ad4d2ed0.tagName, value);
    }
}
class $6bf90154944bce56$export$9cdf0fcb7c05190f extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:rateList";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, firstOrderLosses, firstOrderRates){
        super(attributes, $6bf90154944bce56$export$c4c153dc94cc96b4.tagName);
        this.index = new Map();
        this.folIndex = new Map();
        if (firstOrderLosses) {
            let i = 0;
            firstOrderLosses.forEach((fol)=>{
                this.index.set($6bf90154944bce56$export$2450ca15ad4d2ed0.tagName + i.toString(), this.nodes.size);
                this.folIndex.set(this.folIndex.size, this.nodes.size);
                this.addNode(fol);
                i++;
            });
            this.fols = firstOrderLosses;
        } else this.fols = [];
        this.forIndex = new Map();
        if (firstOrderRates) {
            let i = 0;
            firstOrderRates.forEach((forr)=>{
                this.index.set($6bf90154944bce56$export$984142e8329468e6.tagName + i.toString(), this.nodes.size);
                this.forIndex.set(this.forIndex.size, this.nodes.size);
                this.addNode(forr);
                i++;
            });
            this.fors = firstOrderRates;
        } else this.fors = [];
    }
    /**
     * Add a first order loss.
     */ addFirstOrderLoss(f) {
        this.folIndex.set(this.folIndex.size, this.nodes.size);
        this.index.set($6bf90154944bce56$export$2450ca15ad4d2ed0.tagName + this.folIndex.size.toString(), this.nodes.size);
        this.fols.push(f);
        this.addNode(f);
    }
    /**
     * Add a first order rate.
     */ addFirstOrderRate(f) {
        this.forIndex.set(this.forIndex.size, this.nodes.size);
        this.index.set($6bf90154944bce56$export$984142e8329468e6.tagName + this.forIndex.size.toString(), this.nodes.size);
        this.fors.push(f);
        this.addNode(f);
    }
}
class $6bf90154944bce56$export$c4c153dc94cc96b4 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "me:analysis";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, description, els, pls, rls){
        super(attributes, $6bf90154944bce56$export$c4c153dc94cc96b4.tagName);
        this.index = new Map();
        if (description) {
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size);
            this.addNode(description);
        }
        this.elIndex = new Map();
        if (els) {
            els.forEach((el)=>{
                this.index.set($6bf90154944bce56$export$f681829d43cbf50e.tagName, this.nodes.size);
                this.elIndex.set(this.elIndex.size, this.nodes.size);
                this.addNode(el);
            });
            this.els = els;
        } else this.els = [];
        this.plIndex = new Map();
        if (pls) {
            pls.forEach((pl)=>{
                this.index.set($6bf90154944bce56$export$8f9a53be9a409418.tagName, this.nodes.size);
                this.plIndex.set(this.plIndex.size, this.nodes.size);
                this.addNode(pl);
            });
            this.pls = pls;
        } else this.pls = [];
        this.rlIndex = new Map();
        if (rls) {
            rls.forEach((rl)=>{
                this.index.set($6bf90154944bce56$export$9cdf0fcb7c05190f.tagName, this.nodes.size);
                this.rlIndex.set(this.rlIndex.size, this.nodes.size);
                this.addNode(rl);
            });
            this.rls = rls;
        } else this.rls = [];
    }
    /**
     * Get the description.
     */ getDescription() {
        if (this.index.has((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName)) {
            let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param description The description.
     */ setDescription(description) {
        if (this.index.has((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName)) {
            let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
            this.nodes.set(i, description);
        } else {
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size);
            this.addNode(description);
        }
    }
    /**
     * @param eigenvalueList The eigenvalue list.
     */ addEigenvalueList(eigenvalueList) {
        this.elIndex.set(this.elIndex.size, this.nodes.size);
        this.addNode(eigenvalueList);
        this.els.push(eigenvalueList);
    }
    /**
     * @param populationList The population list.
     */ addPopulationList(populationList) {
        this.plIndex.set(this.plIndex.size, this.nodes.size);
        this.addNode(populationList);
        this.pls.push(populationList);
    }
    /**
     * @param rateList The rate list.
     */ addRateList(rateList) {
        this.rlIndex.set(this.rlIndex.size, this.nodes.size);
        this.addNode(rateList);
        this.rls.push(rateList);
    }
}




class $754b7c8446bbe616$export$b33a132661f4be58 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bathGas";
    }
    /**
     * @param attributes The attributes.
     * @param moleculeID The moleculeID.
     */ constructor(attributes, moleculeID){
        super(attributes, $754b7c8446bbe616$export$b33a132661f4be58.tagName, moleculeID);
    }
}
class $754b7c8446bbe616$export$cdeafdd1d936ed5b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalRate";
    }
    static{
        /**
     * The key to the ref1 attribute value.
     */ this.s_ref1 = "ref1";
    }
    static{
        /**
     * The key to the ref2 attribute value.
     */ this.s_ref2 = "ref2";
    }
    static{
        /**
     * The key to the refReaction attribute value.
     */ this.s_refReaction = "refReaction";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */ constructor(attributes, value){
        super(attributes, $754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName, value);
    /*
        if (!this.attributes.has(ExperimentalRate.s_ref1)) {
            console.error("ExperimentalRate.constructor: ref1 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_ref2)) {
            console.error("ExperimentalRate.constructor: ref2 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_refReaction)) {
            console.error("ExperimentalRate.constructor: refReaction attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_error)) {
            console.error("ExperimentalRate.constructor: error attribute is missing.");
        }
        */ }
    /**
     * @returns The ref1 attribute or undefined if there is no ref1 attribute.
     */ getRef1() {
        return this.attributes.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_ref1);
    }
    /**
     * Set the ref1 attribute.
     * @param ref1 The ref1.
     */ setRef1(ref1) {
        this.attributes.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_ref1, ref1);
    }
    /**
     * @returns The ref2 attribute or undefined if there is no ref2 attribute.
     */ getRef2() {
        return this.attributes.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_ref2);
    }
    /**
     * Set the ref2 attribute.
     * @param ref2 The ref2.
     */ setRef2(ref2) {
        this.attributes.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_ref2, ref2);
    }
    /**
     * @returns The refReaction attribute or undefined if there is no refReaction attribute.
     */ getRefReaction() {
        return this.attributes.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_refReaction);
    }
    /**
     * Set the refReaction attribute.
     * @param refReaction The refReaction.
     */ setRefReaction(refReaction) {
        this.attributes.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_refReaction, refReaction);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(this.attributes.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.s_error, error.toString());
    }
}
class $754b7c8446bbe616$export$c291f4faacd745a6 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:experimentalYield";
    }
    static{
        /**
     * The key to the ref attribute value.
     */ this.s_ref = "ref";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    static{
        /**
     * The key to the yieldTime attribute value.
     */ this.s_yieldTime = "yieldTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $754b7c8446bbe616$export$c291f4faacd745a6.tagName, value);
    }
    /**
     * @returns The ref attribute or undefined if there is no ref attribute.
     */ getRef() {
        return this.attributes.get($754b7c8446bbe616$export$c291f4faacd745a6.s_ref);
    }
    /**
     * Set the ref attribute.
     * @param ref The ref.
     */ setRef(ref) {
        this.attributes.set($754b7c8446bbe616$export$c291f4faacd745a6.s_ref, ref);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(this.attributes.get($754b7c8446bbe616$export$c291f4faacd745a6.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($754b7c8446bbe616$export$c291f4faacd745a6.s_error, error.toString());
    }
    /**
     * @returns The yieldTime attribute or undefined if there is no yieldTime attribute.
     */ getYieldTime() {
        return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(this.attributes.get($754b7c8446bbe616$export$c291f4faacd745a6.s_yieldTime));
    }
    /**
     * Set the yieldTime attribute.
     * @param yieldTime The yieldTime.
     */ setYieldTime(yieldTime) {
        this.attributes.set($754b7c8446bbe616$export$c291f4faacd745a6.s_yieldTime, yieldTime.toString());
    }
}
class $754b7c8446bbe616$export$ed9dfbc127680fd1 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:experimentalEigenvalue";
    }
    static{
        /**
     * The key to the EigenvalueID attribute value.
     */ this.s_EigenvalueID = "EigenvalueID";
    }
    static{
        /**
     * The key to the error attribute value.
     */ this.s_error = "error";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $754b7c8446bbe616$export$ed9dfbc127680fd1.tagName, value);
    /*
        if (!this.attributes.has(ExperimentalEigenvalue.s_EigenvalueID)) {
            console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalEigenvalue.s_error)) {
            console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
        }
        */ }
    /**
     * @returns The EigenvalueID attribute.
     */ getEigenvalueID() {
        return this.attributes.get($754b7c8446bbe616$export$ed9dfbc127680fd1.s_EigenvalueID);
    }
    /**
     * Set the EigenvalueID attribute.
     * @param EigenvalueID The EigenvalueID.
     */ setEigenvalueID(EigenvalueID) {
        this.attributes.set($754b7c8446bbe616$export$ed9dfbc127680fd1.s_EigenvalueID, EigenvalueID);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(this.attributes.get($754b7c8446bbe616$export$ed9dfbc127680fd1.s_error));
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        this.attributes.set($754b7c8446bbe616$export$ed9dfbc127680fd1.s_error, error.toString());
    }
}
class $754b7c8446bbe616$export$284227145ed02b04 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    static{
        /**
     * The key to the percent attribute value.
     */ this.s_percent = "percent";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $754b7c8446bbe616$export$284227145ed02b04.tagName, value);
    }
    /**
     * @returns The percent attribute or undefined if there is no percent attribute.
     */ getPercent() {
        return this.attributes.get($754b7c8446bbe616$export$284227145ed02b04.s_percent);
    }
    /**
     * Set the percent attribute.
     * @param percent The percent.
     */ setPercent(percent) {
        this.attributes.set($754b7c8446bbe616$export$284227145ed02b04.s_percent, percent);
    }
}
class $754b7c8446bbe616$export$3fe97ecb6b172244 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    static{
        /**
     * The key to the P attribute value.
     */ this.s_P = "P";
    }
    static{
        /**
     * The key to the T attribute value.
     */ this.s_T = "T";
    }
    static{
        /**
     * The key to the precision attribute value.
     */ this.s_precision = "precision";
    }
    static{
        /**
     * The key to the excessReactantConc attribute value.
     */ this.s_excessReactantConc = "excessReactantConc";
    }
    static{
        /**
     * The key to the percentExcessReactantConc attribute value.
     */ this.s_percentExcessReactantConc = "percentExcessReactantConc";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
     */ constructor(attributes, bathGas, experimentRate, experimentalYield, experimentalEigenvalue){
        super(attributes, $754b7c8446bbe616$export$3fe97ecb6b172244.tagName);
        this.index = new Map();
        if (bathGas != undefined) {
            this.index.set($754b7c8446bbe616$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (experimentRate != undefined) {
            this.index.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
        if (experimentalYield != undefined) {
            this.index.set($754b7c8446bbe616$export$c291f4faacd745a6.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
        if (experimentalEigenvalue != undefined) {
            this.index.set($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * @returns The Pressure.
     */ getP() {
        let p = this.attributes.get($754b7c8446bbe616$export$3fe97ecb6b172244.s_P);
        if (p !== undefined) return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(p);
    }
    /**
     * Set The Pressure
     */ setP(p) {
        this.attributes.set($754b7c8446bbe616$export$3fe97ecb6b172244.s_P, p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        let t = this.attributes.get($754b7c8446bbe616$export$3fe97ecb6b172244.s_T);
        if (t !== undefined) return new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(t);
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        this.attributes.set($754b7c8446bbe616$export$3fe97ecb6b172244.s_T, t.toString());
    }
    /**
     * @returns The precision attribute or undefined if there is no precision attribute.
     */ getPrecision() {
        return this.attributes.get($754b7c8446bbe616$export$3fe97ecb6b172244.s_precision);
    }
    /**
     * Set the precision attribute.
     * @param precision The precision.
     */ setPrecision(precision) {
        this.attributes.set($754b7c8446bbe616$export$3fe97ecb6b172244.s_precision, precision);
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get($754b7c8446bbe616$export$b33a132661f4be58.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        let i = this.index.get($754b7c8446bbe616$export$b33a132661f4be58.tagName);
        if (i != undefined) this.nodes.set(i, bathGas);
        else {
            this.index.set($754b7c8446bbe616$export$b33a132661f4be58.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * Remove the bath gas.
     */ removeBathGas() {
        let i = this.index.get($754b7c8446bbe616$export$b33a132661f4be58.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($754b7c8446bbe616$export$b33a132661f4be58.tagName);
        }
    }
    /**
     * @returns The experiment rate.
     */ getExperimentalRate() {
        let i = this.index.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentalRate(experimentRate) {
        let i = this.index.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) this.nodes.set(i, experimentRate);
        else {
            this.index.set($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
    }
    /**
     * Remove the experiment rate.
     */ removeExperimentalRate() {
        let i = this.index.get($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($754b7c8446bbe616$export$cdeafdd1d936ed5b.tagName);
        }
    }
    /**
     * @returns The experimental yield.
     */ getExperimentalYield() {
        let i = this.index.get($754b7c8446bbe616$export$c291f4faacd745a6.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalYield The experimental yield.
     */ setExperimentalYield(experimentalYield) {
        let i = this.index.get($754b7c8446bbe616$export$c291f4faacd745a6.tagName);
        if (i != undefined) this.nodes.set(i, experimentalYield);
        else {
            this.index.set($754b7c8446bbe616$export$c291f4faacd745a6.tagName, this.nodes.size);
            this.addNode(experimentalYield);
        }
    }
    /**
     * Remove the experimental yield.
     */ removeExperimentalYield() {
        let i = this.index.get($754b7c8446bbe616$export$c291f4faacd745a6.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($754b7c8446bbe616$export$c291f4faacd745a6.tagName);
        }
    }
    /**
     * @returns The experimental eigenvalue.
     */ getExperimentalEigenvalue() {
        let i = this.index.get($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentalEigenvalue The experimental eigenvalue.
     */ setExperimentalEigenvalue(experimentalEigenvalue) {
        let i = this.index.get($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) this.nodes.set(i, experimentalEigenvalue);
        else {
            this.index.set($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName, this.nodes.size);
            this.addNode(experimentalEigenvalue);
        }
    }
    /**
     * Remove the experimental eigenvalue.
     */ removeExperimentalEigenvalue() {
        let i = this.index.get($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($754b7c8446bbe616$export$ed9dfbc127680fd1.tagName);
        }
    }
    /**
     * @returns this.attributes.get("excessReactantConc").
     */ getExcessReactantConc() {
        return this.attributes.get($754b7c8446bbe616$export$3fe97ecb6b172244.s_excessReactantConc);
    }
    /**
     * this.attributes.set("excessReactantConc", excessReactantConc).
     */ setExcessReactantConc(excessReactantConc) {
        this.attributes.set($754b7c8446bbe616$export$3fe97ecb6b172244.s_excessReactantConc, excessReactantConc);
    }
    /**
     * @returns this.attributes.get("percentExcessReactantConc").
     */ getPercentExcessReactantConc() {
        return this.attributes.get($754b7c8446bbe616$export$3fe97ecb6b172244.s_percentExcessReactantConc);
    }
    /**
     * this.attributes.set("percentExcessReactantConc", percentExcessReactantConc).
     */ setPercentExcessReactantConc(percentExcessReactantConc) {
        this.attributes.set($754b7c8446bbe616$export$3fe97ecb6b172244.s_percentExcessReactantConc, percentExcessReactantConc);
    }
}
class $754b7c8446bbe616$export$3be0efe793283834 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTs";
    }
    /**
     * @param attributes The attributes.
     * @param pTs The PTs.
     */ constructor(attributes, pTpairs){
        super(attributes, $754b7c8446bbe616$export$3be0efe793283834.tagName);
        if (pTpairs != undefined) {
            pTpairs.forEach((pTpair)=>{
                this.addNode(pTpair);
            });
            this.ptps = pTpairs;
        } else this.ptps = [];
    }
    /**
     * Get the PTpair at the given index.
     * 
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */ get(i) {
        return this.ptps[i];
    }
    /**
     * Set the PTpair at the given index.
     * 
     * @param i The index.
     * @returns The PT pairs.
     */ set(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.ptps[i] = pTpair;
    }
    /**
     * Add a PTpair.
     * 
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ add(pTpair) {
        this.addNode(pTpair);
        this.ptps.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Remove the PTpair at the given index.
     * 
     * @param i The index.
     */ remove(i) {
        this.nodes.delete(i);
        this.ptps.splice(i, 1);
    }
    /**
     * Initialise.
     * 
     * @param pTPair The PTpair to add.
     */ init(ptps) {
        this.clear();
        ptps.forEach((ptp)=>{
            this.addNode(ptp);
            this.ptps.push(ptp);
        });
    }
    /**
     * Clear.
     */ clear() {
        this.nodes.clear();
        this.ptps = [];
    }
}
class $754b7c8446bbe616$export$363c7374d425f4ad extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:conditions";
    }
    /**
     * @param attributes The attributes.
     * @param bathGases The bath gases.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */ constructor(attributes, id, bathGases, pTs){
        super(attributes, $754b7c8446bbe616$export$363c7374d425f4ad.tagName);
        this.id = id;
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Map();
        if (bathGases != undefined) {
            this.index.set($754b7c8446bbe616$export$b33a132661f4be58.tagName, this.nodes.size);
            bathGases.forEach((bathGas)=>{
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.set(bathGas, bathGases.size);
            });
        }
        if (pTs != undefined) {
            this.index.set($754b7c8446bbe616$export$3be0efe793283834.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gases.
     */ getBathGases() {
        return this.bathGases;
    }
    /**
     * @param bathGas The bath gas to add.
     */ addBathGas(bathGas) {
        if (!this.bathGases.has(bathGas)) {
            let index = this.bathGases.size;
            this.bathGases.set(bathGas, index);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
            return index;
        } else return this.bathGases.get(bathGas);
    }
    /**
     * @param bathGas The bath gas to remove.
     */ removeBathGas(bathGas) {
        if (this.bathGases.has(bathGas)) {
            this.bathGases.delete(bathGas);
            this.nodes.delete(this.bathGasesIndex.get(bathGas.value));
        } else console.warn("Conditions.removeBathGas: bathGas not found to remove.");
    }
    /**
     * @returns The Pressure and Temperature pairs.
     */ getPTs() {
        let i = this.index.get($754b7c8446bbe616$export$3be0efe793283834.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param pTs The PTs.
     */ setPTs(pTs) {
        let i = this.index.get($754b7c8446bbe616$export$3be0efe793283834.tagName);
        if (i != undefined) this.nodes.set(i, pTs);
        else {
            this.index.set($754b7c8446bbe616$export$3be0efe793283834.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
}




class $08d0a8a73bf11acb$export$7d9247c9879133fb extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calculateRateCoefficientsOnly";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName);
    }
}
class $08d0a8a73bf11acb$export$60b233651e162b60 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCellDOS";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$60b233651e162b60.tagName);
    }
}
class $08d0a8a73bf11acb$export$7e63e5104be309ff extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printCellTransitionStateFlux";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName);
    }
}
class $08d0a8a73bf11acb$export$a915db169f144f37 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorColumnSums";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$a915db169f144f37.tagName);
    }
}
class $08d0a8a73bf11acb$export$e7fff349901f700d extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainBoltzmann";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$e7fff349901f700d.tagName);
    }
}
class $08d0a8a73bf11acb$export$d23243bda4dfae2b extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainDOS";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName);
    }
}
class $08d0a8a73bf11acb$export$55888ef4e813a34d extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkbE";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName);
    }
}
class $08d0a8a73bf11acb$export$f8d814a406a0ff5b extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainkfE";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName);
    }
}
class $08d0a8a73bf11acb$export$3627f2b606ffd3cb extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:printTSsos";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName);
    }
}
class $08d0a8a73bf11acb$export$c5481d114fddc81c extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainedSpeciesProfile";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName);
    }
}
class $08d0a8a73bf11acb$export$ec7c00ae1b17b2ab extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printGrainTransitionStateFlux";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName);
    }
}
class $08d0a8a73bf11acb$export$8420ab6988728a65 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printReactionOperatorSize";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$8420ab6988728a65.tagName);
    }
}
class $08d0a8a73bf11acb$export$ed9b9e07e51c2ac1 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printSpeciesProfile";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName);
    }
}
class $08d0a8a73bf11acb$export$9f7939759d8efd9f extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printPhenomenologicalEvolution";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName);
    }
}
class $08d0a8a73bf11acb$export$fc99460819e23ac5 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printTunnelingCoefficients";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName);
    }
}
class $08d0a8a73bf11acb$export$2f2eaac8983031ef extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:printCrossingCoefficients";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName);
    }
}
class $08d0a8a73bf11acb$export$a3d7e677521f681f extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testDOS";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName);
    }
}
class $08d0a8a73bf11acb$export$980e5abe9a459423 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testRateConstant";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$980e5abe9a459423.tagName);
    }
}
class $08d0a8a73bf11acb$export$5d7dbeba4bf49655 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTheSameCellNumberForAllConditions";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName);
    }
}
class $08d0a8a73bf11acb$export$6ffea14bdffd427f extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ForceMacroDetailedBalance";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$9d51752a8549e2d6 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:hideInactive";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName);
    }
}
class $08d0a8a73bf11acb$export$f0bfd84d03c3a22d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:calcMethod";
    }
    static{
        /**
     * The possible values.
     */ this.options = [
            "simpleCalc",
            "gridSearch",
            "fitting",
            "marquardt",
            "analyticalRepresentation",
            "ThermodynamicTable",
            "sensitivityAnalysis",
            "me:simpleCalc",
            "me:gridSearch",
            "me:fitting",
            "me:marquardt",
            "me:analyticalRepresentation",
            "me:ThermodynamicTable",
            "me:sensitivityAnalysis"
        ];
    }
    /**
     * @param value The value.
     */ constructor(attributes){
        super(attributes, $08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName);
    }
}
class $08d0a8a73bf11acb$export$afd374542f6f3da6 extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:simpleCalc";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "simpleCalc";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class $08d0a8a73bf11acb$export$271191b096a55e63 extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:gridSearch";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "gridSearch";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes);
    }
}
class $08d0a8a73bf11acb$export$830a50cd13af6e84 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:fittingIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$830a50cd13af6e84.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$654b70df01671c79 extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
     * The xsi_type.
     */ this.xsi_type = "me:fitting";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "fitting";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, fittingIterations){
        super(attributes);
        if (fittingIterations != undefined) this.addNode(fittingIterations);
    }
    /**
     * @returns The fittingIterations or undefined.
     */ getFittingIterations() {
        return this.nodes.get(0);
    }
    /**
     * @param fittingIterations The fittingIterations.
     */ setFittingIterations(fittingIterations) {
        this.nodes.set(0, fittingIterations);
    }
    /**
     * Remove the fittingIterations.
     */ removeFittingIterations() {
        this.nodes.delete(0);
    }
}
class $08d0a8a73bf11acb$export$9f699e98369d9591 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtIterations";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$9f699e98369d9591.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$ca1e6c3ff9fd3627 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtTolerance";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$d3887b529debf19d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MarquardtDerivDelta";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$d3887b529debf19d.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$7968aa666bcf62fa extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:marquardt";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "marquardt";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, marquardtIterations, marquardtTolerance, marquardtDerivDelta){
        super(attributes);
        this.index = new Map();
        if (marquardtIterations != undefined) {
            this.index.set($08d0a8a73bf11acb$export$9f699e98369d9591.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
        if (marquardtTolerance != undefined) {
            this.index.set($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
        if (marquardtDerivDelta != undefined) {
            this.index.set($08d0a8a73bf11acb$export$d3887b529debf19d.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * @returns The marquardtIterations or undefined.
     */ getMarquardtIterations() {
        let i = this.index.get($08d0a8a73bf11acb$export$9f699e98369d9591.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtIterations The marquardtIterations.
     */ setMarquardtIterations(marquardtIterations) {
        let i = this.index.get($08d0a8a73bf11acb$export$9f699e98369d9591.tagName);
        if (i != undefined) this.nodes.set(i, marquardtIterations);
        else {
            this.index.set($08d0a8a73bf11acb$export$9f699e98369d9591.tagName, this.nodes.size);
            this.addNode(marquardtIterations);
        }
    }
    /**
     * Remove the marquardtIterations.
     */ removeMarquardtIterations() {
        let i = this.index.get($08d0a8a73bf11acb$export$9f699e98369d9591.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$9f699e98369d9591.tagName);
        }
    }
    /**
     * @returns The marquardtTolerance or undefined.
     */ getMarquardtTolerance() {
        let i = this.index.get($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtTolerance The marquardtTolerance.
     */ setMarquardtTolerance(marquardtTolerance) {
        let i = this.index.get($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) this.nodes.set(i, marquardtTolerance);
        else {
            this.index.set($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName, this.nodes.size);
            this.addNode(marquardtTolerance);
        }
    }
    /**
     * Remove the marquardtTolerance.
     */ removeMarquardtTolerance() {
        let i = this.index.get($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$ca1e6c3ff9fd3627.tagName);
        }
    }
    /**
     * @returns The marquardtDerivDelta or undefined.
     */ getMarquardtDerivDelta() {
        let i = this.index.get($08d0a8a73bf11acb$export$d3887b529debf19d.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param marquardtDerivDelta The marquardtDerivDelta.
     */ setMarquardtDerivDelta(marquardtDerivDelta) {
        let i = this.index.get($08d0a8a73bf11acb$export$d3887b529debf19d.tagName);
        if (i != undefined) this.nodes.set(i, marquardtDerivDelta);
        else {
            this.index.set($08d0a8a73bf11acb$export$d3887b529debf19d.tagName, this.nodes.size);
            this.addNode(marquardtDerivDelta);
        }
    }
    /**
     * Remove the marquardtDerivDelta.
     */ removeMarquardtDerivDelta() {
        let i = this.index.get($08d0a8a73bf11acb$export$d3887b529debf19d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$d3887b529debf19d.tagName);
        }
    }
}
class $08d0a8a73bf11acb$export$85eca882ff5fb66 extends (0, $cc8c7201a9bad777$export$3288d34c523a1192) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:useTraceWeighting";
    }
    constructor(){
        super($08d0a8a73bf11acb$export$85eca882ff5fb66.tagName);
    }
}
class $08d0a8a73bf11acb$export$93514d28bd18d75a extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:format";
    }
    static{
        /**
     * The options.
     */ this.options = [
            "cantera",
            "chemkin"
        ];
    }
    static{
        /**
     * The rateUnits.
     */ this.rateUnits = "rateUnits";
    }
    static{
        /**
     * The rateUnits options.
     */ this.rateUnitsOptions = [
            "cm3mole-1s-1",
            "cm3molecule-1s-1"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$93514d28bd18d75a.tagName, value);
    }
    /**
     * @returns The value of the "rateUnits" attribute or undefined.
     */ getRateUnits() {
        return this.attributes.get($08d0a8a73bf11acb$export$93514d28bd18d75a.rateUnits);
    }
    /**
     * @param rateUnits The value of the "rateUnits" attribute.
     */ setRateUnits(rateUnits) {
        this.attributes.set($08d0a8a73bf11acb$export$93514d28bd18d75a.rateUnits, rateUnits);
    }
    /**
     * Remove the "rateUnits" attribute.
     */ removeRateUnits() {
        this.attributes.delete($08d0a8a73bf11acb$export$93514d28bd18d75a.rateUnits);
    }
}
class $08d0a8a73bf11acb$export$be201676156f3e60 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:precision";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$be201676156f3e60.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$19d20f3642d82681 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$19d20f3642d82681.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$906be0805438fd80 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebNumConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$906be0805438fd80.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$6ab4fe1621c91452 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$e9853d49316ae9ae extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinTemp";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$39eacc768d7e9bb extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMaxConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName, value);
    }
    /**
     * @returns The units.
     */ getUnits() {
        return this.attributes.get("units");
    }
    /**
     * @param units The units.
     */ setUnits(units) {
        this.attributes.set("units", units);
    }
}
class $08d0a8a73bf11acb$export$78194e57ce26d99a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebMinConc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$78194e57ce26d99a.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$96094ac7e31a750e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebTExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$96094ac7e31a750e.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$ae695595d3952700 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:chebPExSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$ae695595d3952700.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$fe9781900d201bdf extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:analyticalRepresentation";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "analyticalRepresentation";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, format, precision, chebNumTemp, chebNumConc, chebMaxTemp, chebMinTemp, chebMaxConc, chebMinConc, chebTExSize, chebPExSize){
        super(attributes);
        this.index = new Map();
        if (format != undefined) {
            this.index.set($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName, this.nodes.size);
            this.addNode(format);
        }
        if (precision != undefined) {
            this.index.set($08d0a8a73bf11acb$export$be201676156f3e60.tagName, this.nodes.size);
            this.addNode(precision);
        }
        if (chebNumTemp != undefined) {
            this.index.set($08d0a8a73bf11acb$export$19d20f3642d82681.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
        if (chebNumConc != undefined) {
            this.index.set($08d0a8a73bf11acb$export$906be0805438fd80.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
        if (chebMaxTemp != undefined) {
            this.index.set($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
        if (chebMinTemp != undefined) {
            this.index.set($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
        if (chebMaxConc != undefined) {
            this.index.set($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
        if (chebMinConc != undefined) {
            this.index.set($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
        if (chebTExSize != undefined) {
            this.index.set($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
        if (chebPExSize != undefined) {
            this.index.set($08d0a8a73bf11acb$export$ae695595d3952700.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * @returns The format or undefined.
     */ getFormat() {
        let i = this.index.get($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param format The format.
     */ setFormat(format) {
        let i = this.index.get($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName);
        if (i != undefined) this.nodes.set(i, format);
        else {
            this.index.set($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName, this.nodes.size);
            this.addNode(format);
        }
    }
    /**
     * Remove the format.
     */ removeFormat() {
        let i = this.index.get($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$93514d28bd18d75a.tagName);
        }
    }
    /**
     * @returns The precision or undefined.
     */ getPrecision() {
        let i = this.index.get($08d0a8a73bf11acb$export$be201676156f3e60.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param precision The precision.
     */ setPrecision(precision) {
        let i = this.index.get($08d0a8a73bf11acb$export$be201676156f3e60.tagName);
        if (i != undefined) this.nodes.set(i, precision);
        else {
            this.index.set($08d0a8a73bf11acb$export$be201676156f3e60.tagName, this.nodes.size);
            this.addNode(precision);
        }
    }
    /**
     * Remove the precision.
     */ removePrecision() {
        let i = this.index.get($08d0a8a73bf11acb$export$be201676156f3e60.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$be201676156f3e60.tagName);
        }
    }
    /**
     * @returns The chebNumTemp or undefined.
     */ getChebNumTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$19d20f3642d82681.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumTemp The chebNumTemp.
     */ setChebNumTemp(chebNumTemp) {
        let i = this.index.get($08d0a8a73bf11acb$export$19d20f3642d82681.tagName);
        if (i != undefined) this.nodes.set(i, chebNumTemp);
        else {
            this.index.set($08d0a8a73bf11acb$export$19d20f3642d82681.tagName, this.nodes.size);
            this.addNode(chebNumTemp);
        }
    }
    /**
     * Remove the chebNumTemp.
     */ removeChebNumTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$19d20f3642d82681.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$19d20f3642d82681.tagName);
        }
    }
    /**
     * @returns The chebNumConc or undefined.
     */ getChebNumConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$906be0805438fd80.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebNumConc The chebNumConc.
     */ setChebNumConc(chebNumConc) {
        let i = this.index.get($08d0a8a73bf11acb$export$906be0805438fd80.tagName);
        if (i != undefined) this.nodes.set(i, chebNumConc);
        else {
            this.index.set($08d0a8a73bf11acb$export$906be0805438fd80.tagName, this.nodes.size);
            this.addNode(chebNumConc);
        }
    }
    /**
     * Remove the chebNumConc.
     */ removeChebNumConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$906be0805438fd80.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$906be0805438fd80.tagName);
        }
    }
    /**
     * @returns The chebMaxTemp or undefined.
     */ getChebMaxTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxTemp The chebMaxTemp.
     */ setChebMaxTemp(chebMaxTemp) {
        let i = this.index.get($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxTemp);
        else {
            this.index.set($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName, this.nodes.size);
            this.addNode(chebMaxTemp);
        }
    }
    /**
     * Remove the chebMaxTemp.
     */ removeChebMaxTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$6ab4fe1621c91452.tagName);
        }
    }
    /**
     * @returns The chebMinTemp or undefined.
     */ getChebMinTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinTemp The chebMinTemp.
     */ setChebMinTemp(chebMinTemp) {
        let i = this.index.get($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName);
        if (i != undefined) this.nodes.set(i, chebMinTemp);
        else {
            this.index.set($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName, this.nodes.size);
            this.addNode(chebMinTemp);
        }
    }
    /**
     * Remove the chebMinTemp.
     */ removeChebMinTemp() {
        let i = this.index.get($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$e9853d49316ae9ae.tagName);
        }
    }
    /**
     * @returns The chebMaxConc or undefined.
     */ getChebMaxConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMaxConc The chebMaxConc.
     */ setChebMaxConc(chebMaxConc) {
        let i = this.index.get($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName);
        if (i != undefined) this.nodes.set(i, chebMaxConc);
        else {
            this.index.set($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName, this.nodes.size);
            this.addNode(chebMaxConc);
        }
    }
    /**
     * Remove the chebMaxConc.
     */ removeChebMaxConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$39eacc768d7e9bb.tagName);
        }
    }
    /**
     * @returns The chebMinConc or undefined.
     */ getChebMinConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebMinConc The chebMinConc.
     */ setChebMinConc(chebMinConc) {
        let i = this.index.get($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName);
        if (i != undefined) this.nodes.set(i, chebMinConc);
        else {
            this.index.set($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName, this.nodes.size);
            this.addNode(chebMinConc);
        }
    }
    /**
     * Remove the chebMinConc.
     */ removeChebMinConc() {
        let i = this.index.get($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$78194e57ce26d99a.tagName);
        }
    }
    /**
     * @returns The chebTExSize or undefined.
     */ getChebTExSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebTExSize The chebTExSize.
     */ setChebTExSize(chebTExSize) {
        let i = this.index.get($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName);
        if (i != undefined) this.nodes.set(i, chebTExSize);
        else {
            this.index.set($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName, this.nodes.size);
            this.addNode(chebTExSize);
        }
    }
    /**
     * Remove the chebTExSize.
     */ removeChebTExSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$96094ac7e31a750e.tagName);
        }
    }
    /**
     * @returns The chebPExSize or undefined.
     */ getChebPExSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$ae695595d3952700.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param chebPExSize The chebPExSize.
     */ setChebPExSize(chebPExSize) {
        let i = this.index.get($08d0a8a73bf11acb$export$ae695595d3952700.tagName);
        if (i != undefined) this.nodes.set(i, chebPExSize);
        else {
            this.index.set($08d0a8a73bf11acb$export$ae695595d3952700.tagName, this.nodes.size);
            this.addNode(chebPExSize);
        }
    }
    /**
     * Remove the chebPExSize.
     */ removeChebPExSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$ae695595d3952700.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$ae695595d3952700.tagName);
        }
    }
}
class $08d0a8a73bf11acb$export$7be1a36e1f74dbc7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmin";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$ac2eb7df727f506d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmid";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$58c8f4b7ec654137 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tmax";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$7b8cfe3a6a460886 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Tstep";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$16ef3f79998b60b4 extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
     * The tag name.
     */ this.xsi_type = "me:ThermodynamicTable";
    }
    static{
        /**
     * The tag name.
     */ this.xsi_type2 = "ThermodynamicTable";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, tmin, tmid, tmax, tstep){
        super(attributes);
        this.index = new Map();
        if (tmin != undefined) {
            this.index.set($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName, this.nodes.size);
            this.addNode(tmin);
        }
        if (tmid != undefined) {
            this.index.set($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName, this.nodes.size);
            this.addNode(tmid);
        }
        if (tmax != undefined) {
            this.index.set($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName, this.nodes.size);
            this.addNode(tmax);
        }
        if (tstep != undefined) {
            this.index.set($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * @returns The tmin or undefined.
     */ getTmin() {
        let i = this.index.get($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmin The tmin.
     */ setTmin(tmin) {
        let i = this.index.get($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) this.nodes.set(i, tmin);
        else {
            this.index.set($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName, this.nodes.size);
            this.addNode(tmin);
        }
    }
    /**
     * Remove the tmin.
     */ removeTmin() {
        let i = this.index.get($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$7be1a36e1f74dbc7.tagName);
        }
    }
    /**
     * @returns The tmid or undefined.
     */ getTmid() {
        let i = this.index.get($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmid The tmid.
     */ setTmid(tmid) {
        let i = this.index.get($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName);
        if (i != undefined) this.nodes.set(i, tmid);
        else {
            this.index.set($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName, this.nodes.size);
            this.addNode(tmid);
        }
    }
    /**
     * Remove the tmid.
     */ removeTmid() {
        let i = this.index.get($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$ac2eb7df727f506d.tagName);
        }
    }
    /**
     * @returns The tmax or undefined.
     */ getTmax() {
        let i = this.index.get($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tmax The tmax.
     */ setTmax(tmax) {
        let i = this.index.get($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName);
        if (i != undefined) this.nodes.set(i, tmax);
        else {
            this.index.set($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName, this.nodes.size);
            this.addNode(tmax);
        }
    }
    /**
     * Remove the tmax.
     */ removeTmax() {
        let i = this.index.get($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$58c8f4b7ec654137.tagName);
        }
    }
    /**
     * @returns The tstep or undefined.
     */ getTstep() {
        let i = this.index.get($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param tstep The tstep.
     */ setTstep(tstep) {
        let i = this.index.get($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) this.nodes.set(i, tstep);
        else {
            this.index.set($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName, this.nodes.size);
            this.addNode(tstep);
        }
    }
    /**
     * Remove the tstep.
     */ removeTstep() {
        let i = this.index.get($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$7b8cfe3a6a460886.tagName);
        }
    }
}
class $08d0a8a73bf11acb$export$37d0520a9fac7849 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisSamples";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$37d0520a9fac7849.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$9a832710e54827ea extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityAnalysisOrder";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$9a832710e54827ea.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$b43b57458ce8fb96 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityNumVarRedIters";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$e98aeac6c6b1df09 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sensitivityVarRedMethod";
    }
    static{
        /**
     * The options.
     */ this.options = [
            "AdditiveControl",
            "RatioControl"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$a532500cc43efbef extends $08d0a8a73bf11acb$export$f0bfd84d03c3a22d {
    static{
        /**
    * The xsi_type.
    */ this.xsi_type = "me:sensitivityAnalysis";
    }
    static{
        /**
     * The xsi_type2.
     */ this.xsi_type2 = "sensitivityAnalysis";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, sensitivityAnalysisSamples, sensitivityAnalysisOrder, sensitivityNumVarRedIters, sensitivityVarRedMethod){
        super(attributes);
        this.index = new Map();
        if (sensitivityAnalysisSamples != undefined) {
            this.index.set($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
        if (sensitivityAnalysisOrder != undefined) {
            this.index.set($08d0a8a73bf11acb$export$9a832710e54827ea.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
        if (sensitivityNumVarRedIters != undefined) {
            this.index.set($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
        if (sensitivityVarRedMethod != undefined) {
            this.index.set($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * @returns The sensitivityAnalysisSamples or undefined.
     */ getSensitivityAnalysisSamples() {
        let i = this.index.get($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisSamples The sensitivityAnalysisSamples.
     */ setSensitivityAnalysisSamples(sensitivityAnalysisSamples) {
        let i = this.index.get($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisSamples);
        else {
            this.index.set($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisSamples);
        }
    }
    /**
     * Remove the sensitivityAnalysisSamples.
     */ removeSensitivityAnalysisSamples() {
        let i = this.index.get($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$37d0520a9fac7849.tagName);
        }
    }
    /**
     * @returns The sensitivityAnalysisOrder or undefined.
     */ getSensitivityAnalysisOrder() {
        let i = this.index.get($08d0a8a73bf11acb$export$9a832710e54827ea.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityAnalysisOrder The sensitivityAnalysisOrder.
     */ setSensitivityAnalysisOrder(sensitivityAnalysisOrder) {
        let i = this.index.get($08d0a8a73bf11acb$export$9a832710e54827ea.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityAnalysisOrder);
        else {
            this.index.set($08d0a8a73bf11acb$export$9a832710e54827ea.tagName, this.nodes.size);
            this.addNode(sensitivityAnalysisOrder);
        }
    }
    /**
     * Remove the sensitivityAnalysisOrder.
     */ removeSensitivityAnalysisOrder() {
        let i = this.index.get($08d0a8a73bf11acb$export$9a832710e54827ea.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$9a832710e54827ea.tagName);
        }
    }
    /**
     * @returns The sensitivityNumVarRedIters or undefined.
     */ getSensitivityNumVarRedIters() {
        let i = this.index.get($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityNumVarRedIters The sensitivityNumVarRedIters.
     */ setSensitivityNumVarRedIters(sensitivityNumVarRedIters) {
        let i = this.index.get($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityNumVarRedIters);
        else {
            this.index.set($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName, this.nodes.size);
            this.addNode(sensitivityNumVarRedIters);
        }
    }
    /**
     * Remove the sensitivityNumVarRedIters.
     */ removeSensitivityNumVarRedIters() {
        let i = this.index.get($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$b43b57458ce8fb96.tagName);
        }
    }
    /**
     * @returns The sensitivityVarRedMethod or undefined.
     */ getSensitivityVarRedMethod() {
        let i = this.index.get($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param sensitivityVarRedMethod The sensitivityVarRedMethod.
     */ setSensitivityVarRedMethod(sensitivityVarRedMethod) {
        let i = this.index.get($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) this.nodes.set(i, sensitivityVarRedMethod);
        else {
            this.index.set($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName, this.nodes.size);
            this.addNode(sensitivityVarRedMethod);
        }
    }
    /**
     * Remove the sensitivityVarRedMethod.
     */ removeSensitivityVarRedMethod() {
        let i = this.index.get($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$e98aeac6c6b1df09.tagName);
        }
    }
}
class $08d0a8a73bf11acb$export$2453e311f702d9c7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:eigenvalues";
    }
    constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$2453e311f702d9c7.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$421603058c6718db extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:shortestTimeOfInterest";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$421603058c6718db.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$b51d7314540831ed extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MaximumEvolutionTime";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$b51d7314540831ed.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$576b56ca6e34780b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$576b56ca6e34780b.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$159b5d3263f1049a extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:diagramEnergyOffset";
    }
    /**
      * @param attributes The attributes.
      * @param value The value.
      */ constructor(attributes, value){
        super(attributes, $08d0a8a73bf11acb$export$159b5d3263f1049a.tagName, value);
    }
}
class $08d0a8a73bf11acb$export$1f37c7c73e401f31 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:testMicroRates";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName);
        this.tMin = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(attributes.get("Tmin"));
        this.tMax = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(attributes.get("Tmax"));
        this.tStep = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(attributes.get("Tstep"));
    }
    /**
     * @returns The maximum temperature.
     */ getTmin() {
        return this.tMin;
    }
    /**
     * @param tMin The minimum temperature.
     */ setTmin(tMin) {
        this.tMin = tMin;
        this.attributes?.set("Tmin", tMin.toString());
    }
    /**
     * @returns The maximum temperature.
     */ getTmax() {
        return this.tMax;
    }
    /**
     * @param tMax The maximum temperature.
     */ setTmax(tMax) {
        this.tMax = tMax;
        this.attributes?.set("Tmax", tMax.toString());
    }
    /**
     * @returns The temperature step.
     */ getTstep() {
        return this.tStep;
    }
    /**
     * @param tStep The temperature step.
     */ setTstep(tStep) {
        this.tStep = tStep;
        this.attributes?.set("Tstep", tStep.toString());
    }
}
class $08d0a8a73bf11acb$export$7a7fa4424cb20976 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:control";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, id){
        super(attributes, $08d0a8a73bf11acb$export$7a7fa4424cb20976.tagName);
        this.id = id;
        this.index = new Map();
    }
    /**
     * @returns The calculateRateCoefficientsOnly or undefined.
     */ getCalculateRateCoefficientsOnly() {
        let i = this.index.get($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calculateRateCoefficientsOnly The calculateRateCoefficientsOnly.
     */ setCalculateRateCoefficientsOnly(calculateRateCoefficientsOnly) {
        let i = this.index.get($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName);
        if (i != undefined) this.nodes.set(i, calculateRateCoefficientsOnly);
        else {
            this.index.set($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName, this.nodes.size);
            this.addNode(calculateRateCoefficientsOnly);
        }
    }
    /**
     * Remove the calculateRateCoefficientsOnly.
     */ removeCalculateRateCoefficientsOnly() {
        let i = this.index.get($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$7d9247c9879133fb.tagName);
        }
    }
    /**
     * @returns The printCellDOS or undefined.
     */ getPrintCellDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$60b233651e162b60.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellDOS The printCellDOS.
     */ setPrintCellDOS(printCellDOS) {
        let i = this.index.get($08d0a8a73bf11acb$export$60b233651e162b60.tagName);
        if (i != undefined) this.nodes.set(i, printCellDOS);
        else {
            this.index.set($08d0a8a73bf11acb$export$60b233651e162b60.tagName, this.nodes.size);
            this.addNode(printCellDOS);
        }
    }
    /**
     * Remove the printCellDOS.
     */ removePrintCellDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$60b233651e162b60.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$60b233651e162b60.tagName);
        }
    }
    /**
     * @returns The printCellTransitionStateFlux or undefined.
     */ getPrintCellTransitionStateFlux() {
        let i = this.index.get($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCellTransitionStateFlux The printCellTransitionStateFlux.
     */ setPrintCellTransitionStateFlux(printCellTransitionStateFlux) {
        let i = this.index.get($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName);
        if (i != undefined) this.nodes.set(i, printCellTransitionStateFlux);
        else {
            this.index.set($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName, this.nodes.size);
            this.addNode(printCellTransitionStateFlux);
        }
    }
    /**
     * Remove the printCellTransitionStateFlux.
     */ removePrintCellTransitionStateFlux() {
        let i = this.index.get($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$7e63e5104be309ff.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorColumnSums or undefined.
     */ getPrintReactionOperatorColumnSums() {
        let i = this.index.get($08d0a8a73bf11acb$export$a915db169f144f37.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorColumnSums The printReactionOperatorColumnSums.
     */ setPrintReactionOperatorColumnSums(printReactionOperatorColumnSums) {
        let i = this.index.get($08d0a8a73bf11acb$export$a915db169f144f37.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorColumnSums);
        else {
            this.index.set($08d0a8a73bf11acb$export$a915db169f144f37.tagName, this.nodes.size);
            this.addNode(printReactionOperatorColumnSums);
        }
    }
    /**
     * Remove the printReactionOperatorColumnSums.
     */ removePrintReactionOperatorColumnSums() {
        let i = this.index.get($08d0a8a73bf11acb$export$a915db169f144f37.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$a915db169f144f37.tagName);
        }
    }
    /**
     * @returns The printGrainBoltzmann or undefined.
     */ getPrintGrainBoltzmann() {
        let i = this.index.get($08d0a8a73bf11acb$export$e7fff349901f700d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainBoltzmann The printGrainBoltzmann.
     */ setPrintGrainBoltzmann(printGrainBoltzmann) {
        let i = this.index.get($08d0a8a73bf11acb$export$e7fff349901f700d.tagName);
        if (i != undefined) this.nodes.set(i, printGrainBoltzmann);
        else {
            this.index.set($08d0a8a73bf11acb$export$e7fff349901f700d.tagName, this.nodes.size);
            this.addNode(printGrainBoltzmann);
        }
    }
    /**
     * Remove the printGrainBoltzmann.
     */ removePrintGrainBoltzmann() {
        let i = this.index.get($08d0a8a73bf11acb$export$e7fff349901f700d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$e7fff349901f700d.tagName);
        }
    }
    /**
     * @returns The printGrainDOS or undefined.
     */ getPrintGrainDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainDOS The printGrainDOS.
     */ setPrintGrainDOS(printGrainDOS) {
        let i = this.index.get($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName);
        if (i != undefined) this.nodes.set(i, printGrainDOS);
        else {
            this.index.set($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName, this.nodes.size);
            this.addNode(printGrainDOS);
        }
    }
    /**
     * Remove the printGrainDOS.
     */ removePrintGrainDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$d23243bda4dfae2b.tagName);
        }
    }
    /**
     * @returns The printGrainkbE or undefined.
     */ getPrintGrainkbE() {
        let i = this.index.get($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkbE The printGrainkbE.
     */ setPrintGrainkbE(printGrainkbE) {
        let i = this.index.get($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkbE);
        else {
            this.index.set($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName, this.nodes.size);
            this.addNode(printGrainkbE);
        }
    }
    /**
     * Remove the printGrainkbE.
     */ removePrintGrainkbE() {
        let i = this.index.get($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$55888ef4e813a34d.tagName);
        }
    }
    /**
     * @returns The printGrainkfE or undefined.
     */ getPrintGrainkfE() {
        let i = this.index.get($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainkfE The printGrainkfE.
     */ setPrintGrainkfE(printGrainkfE) {
        let i = this.index.get($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) this.nodes.set(i, printGrainkfE);
        else {
            this.index.set($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName, this.nodes.size);
            this.addNode(printGrainkfE);
        }
    }
    /**
     * Remove the printGrainkfE.
     */ removePrintGrainkfE() {
        let i = this.index.get($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$f8d814a406a0ff5b.tagName);
        }
    }
    /**
     * @returns The printTSsos or undefined.
     */ getPrintTSsos() {
        let i = this.index.get($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTSsos The printTSsos.
     */ setPrintTSsos(printTSsos) {
        let i = this.index.get($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) this.nodes.set(i, printTSsos);
        else {
            this.index.set($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName, this.nodes.size);
            this.addNode(printTSsos);
        }
    }
    /**
     * Remove the printTSsos.
     */ removePrintTSsos() {
        let i = this.index.get($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$3627f2b606ffd3cb.tagName);
        }
    }
    /**
     * @returns The printGrainedSpeciesProfile or undefined.
     */ getPrintGrainedSpeciesProfile() {
        let i = this.index.get($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainedSpeciesProfile The printGrainedSpeciesProfile.
     */ setPrintGrainedSpeciesProfile(printGrainedSpeciesProfile) {
        let i = this.index.get($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName);
        if (i != undefined) this.nodes.set(i, printGrainedSpeciesProfile);
        else {
            this.index.set($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName, this.nodes.size);
            this.addNode(printGrainedSpeciesProfile);
        }
    }
    /**
     * Remove the printGrainedSpeciesProfile.
     */ removePrintGrainedSpeciesProfile() {
        let i = this.index.get($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$c5481d114fddc81c.tagName);
        }
    }
    /**
     * @returns The printGrainTransitionStateFlux or undefined.
     */ getPrintGrainTransitionStateFlux() {
        let i = this.index.get($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printGrainTransitionStateFlux The printGrainTransitionStateFlux.
     */ setPrintGrainTransitionStateFlux(printGrainTransitionStateFlux) {
        let i = this.index.get($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) this.nodes.set(i, printGrainTransitionStateFlux);
        else {
            this.index.set($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName, this.nodes.size);
            this.addNode(printGrainTransitionStateFlux);
        }
    }
    /**
     * Remove the printGrainTransitionStateFlux.
     */ removePrintGrainTransitionStateFlux() {
        let i = this.index.get($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$ec7c00ae1b17b2ab.tagName);
        }
    }
    /**
     * @returns The printReactionOperatorSize or undefined.
     */ getPrintReactionOperatorSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$8420ab6988728a65.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printReactionOperatorSize The printReactionOperatorSize.
     */ setPrintReactionOperatorSize(printReactionOperatorSize) {
        let i = this.index.get($08d0a8a73bf11acb$export$8420ab6988728a65.tagName);
        if (i != undefined) this.nodes.set(i, printReactionOperatorSize);
        else {
            this.index.set($08d0a8a73bf11acb$export$8420ab6988728a65.tagName, this.nodes.size);
            this.addNode(printReactionOperatorSize);
        }
    }
    /**
     * Remove the printReactionOperatorSize.
     */ removePrintReactionOperatorSize() {
        let i = this.index.get($08d0a8a73bf11acb$export$8420ab6988728a65.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$8420ab6988728a65.tagName);
        }
    }
    /**
     * @returns The printSpeciesProfile or undefined.
     */ getPrintSpeciesProfile() {
        let i = this.index.get($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printSpeciesProfile The printSpeciesProfile.
     */ setPrintSpeciesProfile(printSpeciesProfile) {
        let i = this.index.get($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) this.nodes.set(i, printSpeciesProfile);
        else {
            this.index.set($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName, this.nodes.size);
            this.addNode(printSpeciesProfile);
        }
    }
    /**
     * Remove the printSpeciesProfile.
     */ removePrintSpeciesProfile() {
        let i = this.index.get($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$ed9b9e07e51c2ac1.tagName);
        }
    }
    /**
     * @returns The printPhenomenologicalEvolution or undefined.
     */ getPrintPhenomenologicalEvolution() {
        let i = this.index.get($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printPhenomenologicalEvolution The printPhenomenologicalEvolution.
     */ setPrintPhenomenologicalEvolution(printPhenomenologicalEvolution) {
        let i = this.index.get($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName);
        if (i != undefined) this.nodes.set(i, printPhenomenologicalEvolution);
        else {
            this.index.set($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName, this.nodes.size);
            this.addNode(printPhenomenologicalEvolution);
        }
    }
    /**
     * Remove the printPhenomenologicalEvolution.
     */ removePrintPhenomenologicalEvolution() {
        let i = this.index.get($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$9f7939759d8efd9f.tagName);
        }
    }
    /**
     * @returns The printTunnelingCoefficients or undefined.
     */ getPrintTunnelingCoefficients() {
        let i = this.index.get($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTunnelingCoefficients The printTunnelingCoefficients.
     */ setPrintTunnelingCoefficients(printTunnelingCoefficients) {
        let i = this.index.get($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName);
        if (i != undefined) this.nodes.set(i, printTunnelingCoefficients);
        else {
            this.index.set($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName, this.nodes.size);
            this.addNode(printTunnelingCoefficients);
        }
    }
    /**
     * Remove the printTunnelingCoefficients.
     */ removePrintTunnelingCoefficients() {
        let i = this.index.get($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$fc99460819e23ac5.tagName);
        }
    }
    /**
     * @returns The printCrossingCoefficients or undefined.
     */ getPrintCrossingCoefficients() {
        let i = this.index.get($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printCrossingCoefficients The printCrossingCoefficients.
     */ setPrintCrossingCoefficients(printCrossingCoefficients) {
        let i = this.index.get($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName);
        if (i != undefined) this.nodes.set(i, printCrossingCoefficients);
        else {
            this.index.set($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName, this.nodes.size);
            this.addNode(printCrossingCoefficients);
        }
    }
    /**
     * Remove the printCrossingCoefficients.
     */ removePrintCrossingCoefficients() {
        let i = this.index.get($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$2f2eaac8983031ef.tagName);
        }
    }
    /**
     * @returns The testDOS or undefined.
     */ getTestDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testDOS The testDOS.
     */ setTestDOS(testDOS) {
        let i = this.index.get($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName);
        if (i != undefined) this.nodes.set(i, testDOS);
        else {
            this.index.set($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName, this.nodes.size);
            this.addNode(testDOS);
        }
    }
    /**
     * Remove the testDOS.
     */ removeTestDOS() {
        let i = this.index.get($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$a3d7e677521f681f.tagName);
        }
    }
    /**
     * @returns The testRateConstant or undefined.
     */ getTestRateConstants() {
        let i = this.index.get($08d0a8a73bf11acb$export$980e5abe9a459423.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstants(testRateConstant) {
        let i = this.index.get($08d0a8a73bf11acb$export$980e5abe9a459423.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set($08d0a8a73bf11acb$export$980e5abe9a459423.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstants() {
        let i = this.index.get($08d0a8a73bf11acb$export$980e5abe9a459423.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$980e5abe9a459423.tagName);
        }
    }
    /**
     * @returns The useTheSameCellNumberForAllConditions or undefined.
     */ getUseTheSameCellNumberForAllConditions() {
        let i = this.index.get($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param useTheSameCellNumberForAllConditions The useTheSameCellNumberForAllConditions.
     */ setUseTheSameCellNumberForAllConditions(useTheSameCellNumberForAllConditions) {
        let i = this.index.get($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) this.nodes.set(i, useTheSameCellNumberForAllConditions);
        else {
            this.index.set($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName, this.nodes.size);
            this.addNode(useTheSameCellNumberForAllConditions);
        }
    }
    /**
     * Remove the useTheSameCellNumberForAllConditions.
     */ removeUseTheSameCellNumberForAllConditions() {
        let i = this.index.get($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$5d7dbeba4bf49655.tagName);
        }
    }
    /**
     * @returns The hideInactive or undefined.
     */ getHideInactive() {
        let i = this.index.get($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param hideInactive The hideInactive.
     */ setHideInactive(hideInactive) {
        let i = this.index.get($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName);
        if (i != undefined) this.nodes.set(i, hideInactive);
        else {
            this.index.set($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName, this.nodes.size);
            this.addNode(hideInactive);
        }
    }
    /**
     * Remove the hideInactive.
     */ removeHideInactive() {
        let i = this.index.get($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$9d51752a8549e2d6.tagName);
        }
    }
    /**
     * @returns The ForceMacroDetailedBalance or undefined.
     */ getForceMacroDetailedBalance() {
        let i = this.index.get($08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param forceMacroDetailedBalance The forceMacroDetailedBalance.
     */ setForceMacroDetailedBalance(forceMacroDetailedBalance) {
        let i = this.index.get($08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName);
        if (i != undefined) this.nodes.set(i, forceMacroDetailedBalance);
        else {
            this.index.set($08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName, this.nodes.size);
            this.addNode(forceMacroDetailedBalance);
        }
    }
    /**
     * Remove the forceMacroDetailedBalance.
     */ removeForceMacroDetailedBalance() {
        let i = this.index.get($08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$6ffea14bdffd427f.tagName);
        }
    }
    /**
     * @returns The calcMethod or undefined.
     */ getCalcMethod() {
        let i = this.index.get($08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param calcMethod The calcMethod.
     */ setCalcMethod(calcMethod) {
        let i = this.index.get($08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) this.nodes.set(i, calcMethod);
        else {
            this.index.set($08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName, this.nodes.size);
            this.addNode(calcMethod);
        }
    }
    /**
     * Remove the calcMethod.
     */ removeCalcMethod() {
        let i = this.index.get($08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$f0bfd84d03c3a22d.tagName);
        }
    }
    /**
     * @returns The eigenvalues or undefined.
     */ getEigenvalues() {
        let i = this.index.get($08d0a8a73bf11acb$export$2453e311f702d9c7.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param eigenvalues The eigenvalues.
     */ setEigenvalues(eigenvalues) {
        let i = this.index.get($08d0a8a73bf11acb$export$2453e311f702d9c7.tagName);
        if (i != undefined) this.nodes.set(i, eigenvalues);
        else {
            this.index.set($08d0a8a73bf11acb$export$2453e311f702d9c7.tagName, this.nodes.size);
            this.addNode(eigenvalues);
        }
    }
    /**
     * Remove the eigenvalues.
     */ removeEigenvalues() {
        let i = this.index.get($08d0a8a73bf11acb$export$2453e311f702d9c7.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$2453e311f702d9c7.tagName);
        }
    }
    /**
     * @returns The shortestTimeOfInterest.
     */ getShortestTimeOfInterest() {
        let i = this.index.get($08d0a8a73bf11acb$export$421603058c6718db.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param shortestTimeOfInterest The shortestTimeOfInterest.
     */ setShortestTimeOfInterest(shortestTimeOfInterest) {
        let i = this.index.get($08d0a8a73bf11acb$export$421603058c6718db.tagName);
        if (i != undefined) this.nodes.set(i, shortestTimeOfInterest);
        else {
            this.index.set($08d0a8a73bf11acb$export$421603058c6718db.tagName, this.nodes.size);
            this.addNode(shortestTimeOfInterest);
        }
    }
    /**
     * Remove the shortestTimeOfInterest.
     */ removeShortestTimeOfInterest() {
        let i = this.index.get($08d0a8a73bf11acb$export$421603058c6718db.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$421603058c6718db.tagName);
        }
    }
    /**
     * @returns The MaximumEvolutionTime.
     */ getMaximumEvolutionTime() {
        let i = this.index.get($08d0a8a73bf11acb$export$b51d7314540831ed.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param maximumEvolutionTime The MaximumEvolutionTime.
     */ setMaximumEvolutionTime(maximumEvolutionTime) {
        let i = this.index.get($08d0a8a73bf11acb$export$b51d7314540831ed.tagName);
        if (i != undefined) this.nodes.set(i, maximumEvolutionTime);
        else {
            this.index.set($08d0a8a73bf11acb$export$b51d7314540831ed.tagName, this.nodes.size);
            this.addNode(maximumEvolutionTime);
        }
    }
    /**
     * Remove the MaximumEvolutionTime.
     */ removeMaximumEvolutionTime() {
        let i = this.index.get($08d0a8a73bf11acb$export$b51d7314540831ed.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$b51d7314540831ed.tagName);
        }
    }
    /**
     * @returns The automaticallySetMaxEne.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get($08d0a8a73bf11acb$export$576b56ca6e34780b.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param automaticallySetMaxEne The automaticallySetMaxEne.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get($08d0a8a73bf11acb$export$576b56ca6e34780b.tagName);
        if (i != undefined) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set($08d0a8a73bf11acb$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Remove the automaticallySetMaxEne.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get($08d0a8a73bf11acb$export$576b56ca6e34780b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$576b56ca6e34780b.tagName);
        }
    }
    /**
     * @returns The diagramEnergyOffset.
     */ getDiagramEnergyOffset() {
        let i = this.index.get($08d0a8a73bf11acb$export$159b5d3263f1049a.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param diagramEnergyOffset The diagramEnergyOffset.
     */ setDiagramEnergyOffset(diagramEnergyOffset) {
        let i = this.index.get($08d0a8a73bf11acb$export$159b5d3263f1049a.tagName);
        if (i != undefined) this.nodes.set(i, diagramEnergyOffset);
        else {
            this.index.set($08d0a8a73bf11acb$export$159b5d3263f1049a.tagName, this.nodes.size);
            this.addNode(diagramEnergyOffset);
        }
    }
    /**
     * Remove the diagramEnergyOffset.
     */ removeDiagramEnergyOffset() {
        let i = this.index.get($08d0a8a73bf11acb$export$159b5d3263f1049a.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$159b5d3263f1049a.tagName);
        }
    }
    /**
     * @returns The testMicroRates or undefined.
     */ getTestMicroRates() {
        let i = this.index.get($08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testMicroRates The testMicroRates.
     */ setTestMicroRates(testMicroRates) {
        let i = this.index.get($08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName);
        if (i != undefined) this.nodes.set(i, testMicroRates);
        else {
            this.index.set($08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName, this.nodes.size);
            this.addNode(testMicroRates);
        }
    }
    /**
     * Remove the testMicroRates.
     */ removeTestMicroRates() {
        let i = this.index.get($08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($08d0a8a73bf11acb$export$1f37c7c73e401f31.tagName);
        }
    }
}



class $97ed023cfe5af5b8$export$e7adebdc1ebd2fed extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "metadata";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $97ed023cfe5af5b8$export$e7adebdc1ebd2fed.tagName);
    }
    /**
     * Get string for label.
     */ getLabelText() {
        let label = "";
        this.attributes.forEach((value, key)=>{
            label += key + ": " + value + " ";
        });
        return label;
    }
}
class $97ed023cfe5af5b8$export$7969c02c126c11b8 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * Tag name.
     */ this.tagName = "dc:title";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $97ed023cfe5af5b8$export$7969c02c126c11b8.tagName, value);
    }
}
class $97ed023cfe5af5b8$export$c78a95f4a27bad68 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * Tag name.
     */ this.tagName = "dc:source";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName, value);
    }
}
class $97ed023cfe5af5b8$export$61180682f135a7f2 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * Tag name.
     */ this.tagName = "dc:creator";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $97ed023cfe5af5b8$export$61180682f135a7f2.tagName, value);
    }
}
class $97ed023cfe5af5b8$export$bf6d63a1cea4a33c extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * Tag name.
     */ this.tagName = "dc:date";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName, value);
    }
}
class $97ed023cfe5af5b8$export$2b747e617c849cca extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * Tag name.
     */ this.tagName = "dc:contributor";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, $97ed023cfe5af5b8$export$2b747e617c849cca.tagName, value);
    }
}
class $97ed023cfe5af5b8$export$3e18a603070a78a extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * Tag name.
     */ this.tagName = "metadataList";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, title, source, creator, date, contributor){
        super(attributes, $97ed023cfe5af5b8$export$3e18a603070a78a.tagName);
        this.index = new Map();
        this.metadataIndex = new Map();
        if (title) {
            this.index.set($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (source) {
            this.index.set($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName, this.nodes.size);
            this.addNode(source);
        }
        if (creator) {
            this.index.set($97ed023cfe5af5b8$export$61180682f135a7f2.tagName, this.nodes.size);
            this.addNode(creator);
        }
        if (date) {
            this.index.set($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName, this.nodes.size);
            this.addNode(date);
        }
        if (contributor) {
            this.index.set($97ed023cfe5af5b8$export$2b747e617c849cca.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Get the title.
     */ getTitle() {
        if (this.index.has($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param title The title.
     */ setTitle(title) {
        if (this.index.has($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName);
            this.nodes.set(i, title);
        } else {
            this.index.set($97ed023cfe5af5b8$export$7969c02c126c11b8.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * Get the source.
     */ getSource() {
        if (this.index.has($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param source The source.
     */ setSource(source) {
        if (this.index.has($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName);
            this.nodes.set(i, source);
        } else {
            this.index.set($97ed023cfe5af5b8$export$c78a95f4a27bad68.tagName, this.nodes.size);
            this.addNode(source);
        }
    }
    /**
     * Get the creator.
     */ getCreator() {
        if (this.index.has($97ed023cfe5af5b8$export$61180682f135a7f2.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$61180682f135a7f2.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param creator The creator.
     */ setCreator(creator) {
        if (this.index.has($97ed023cfe5af5b8$export$61180682f135a7f2.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$61180682f135a7f2.tagName);
            this.nodes.set(i, creator);
        } else {
            this.index.set($97ed023cfe5af5b8$export$61180682f135a7f2.tagName, this.nodes.size);
            this.addNode(creator);
        }
    }
    /**
     * Get the date.
     */ getDate() {
        if (this.index.has($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param date The date.
     */ setDate(date) {
        if (this.index.has($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName);
            this.nodes.set(i, date);
        } else {
            this.index.set($97ed023cfe5af5b8$export$bf6d63a1cea4a33c.tagName, this.nodes.size);
            this.addNode(date);
        }
    }
    /**
     * Get the contributor.
     */ getContributor() {
        if (this.index.has($97ed023cfe5af5b8$export$2b747e617c849cca.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$2b747e617c849cca.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param contributor The contributor.
     */ setContributor(contributor) {
        if (this.index.has($97ed023cfe5af5b8$export$2b747e617c849cca.tagName)) {
            let i = this.index.get($97ed023cfe5af5b8$export$2b747e617c849cca.tagName);
            this.nodes.set(i, contributor);
        } else {
            this.index.set($97ed023cfe5af5b8$export$2b747e617c849cca.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Add metadata.
     * @param metadata The metadata.
     */ addMetadata(metadata) {
        this.metadataIndex.set(this.metadataIndex.size, this.nodes.size);
        this.addNode(metadata);
    }
    /**
     * Get metadata.
     */ getMetadata() {
        let metadata = [];
        for(let i = 0; i < this.metadataIndex.size; i++){
            let j = this.metadataIndex.get(i);
            metadata.push(this.nodes.get(j));
        }
        return metadata;
    }
}



class $f7e4eb4e898217f9$export$26e33f0df9ce919d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:grainSize";
    }
    /**
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName, value);
    }
}
class $f7e4eb4e898217f9$export$576b56ca6e34780b extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:automaticallySetMaxEne";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $f7e4eb4e898217f9$export$576b56ca6e34780b.tagName, value);
    }
}
class $f7e4eb4e898217f9$export$aa73446724166cdb extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyAboveTheTopHill";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $f7e4eb4e898217f9$export$aa73446724166cdb.tagName, value);
    }
}
class $f7e4eb4e898217f9$export$f9c72965e4ddfc8e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:maxTemperature";
    }
    /**
     * @para attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName, value);
    }
}
class $f7e4eb4e898217f9$export$77f098867dc64198 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:modelParameters";
    }
    /**
     * @param attributes The attributes.
     * @param grainSize The grain size.
     * @param automaticallySetMaxEne The automatically set max energy.
     * @param energyAboveTheTopHill The energy above the top hill.
     * @param maxTemperature The max temperature.
     */ constructor(attributes, id, grainSize, automaticallySetMaxEne, energyAboveTheTopHill, maxTemperature){
        super(attributes, $f7e4eb4e898217f9$export$77f098867dc64198.tagName);
        this.id = id;
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (automaticallySetMaxEne != undefined) {
            this.index.set($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set($f7e4eb4e898217f9$export$aa73446724166cdb.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
        if (maxTemperature != undefined) {
            this.index.set($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
    /**
     * @returns The grain size or undefined.
     */ getGrainSize() {
        console.log("getGrainSize");
        let i = this.index.get($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName);
        if (i != undefined) return this.nodes.get(i);
        console.log("XgetGrainSize");
    }
    /**
     * @param grainSize The grain size.
     */ setGrainSize(grainSize) {
        console.log("setGrainSize");
        let i = this.index.get($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName);
        if (i != undefined) this.nodes.set(i, grainSize);
        else {
            this.index.set($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
    }
    /**
     * Removes the grain size.
     */ removeGrainSize() {
        let i = this.index.get($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($f7e4eb4e898217f9$export$26e33f0df9ce919d.tagName);
        }
    }
    /**
     * @returns The automatically set max energy or undefined.
     */ getAutomaticallySetMaxEne() {
        let i = this.index.get($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param automaticallySetMaxEne The automatically set max energy.
     */ setAutomaticallySetMaxEne(automaticallySetMaxEne) {
        let i = this.index.get($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName);
        if (i) this.nodes.set(i, automaticallySetMaxEne);
        else {
            this.index.set($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName, this.nodes.size);
            this.addNode(automaticallySetMaxEne);
        }
    }
    /**
     * Removes the automatically set max energy.
     */ removeAutomaticallySetMaxEne() {
        let i = this.index.get($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($f7e4eb4e898217f9$export$576b56ca6e34780b.tagName);
        }
    }
    /**
     * @returns The energy above the top hill or undefined.
     */ getEnergyAboveTheTopHill() {
        let i = this.index.get($f7e4eb4e898217f9$export$aa73446724166cdb.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param energyAboveTheTopHill The energy above the top hill.
     */ setEnergyAboveTheTopHill(energyAboveTheTopHill) {
        let i = this.index.get($f7e4eb4e898217f9$export$aa73446724166cdb.tagName);
        if (i) this.nodes.set(i, energyAboveTheTopHill);
        else {
            this.index.set($f7e4eb4e898217f9$export$aa73446724166cdb.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
        }
    }
    /**
     * Removes the energy above the top hill.
     */ removeEnergyAboveTheTopHill() {
        let i = this.index.get($f7e4eb4e898217f9$export$aa73446724166cdb.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($f7e4eb4e898217f9$export$aa73446724166cdb.tagName);
        }
    }
    /**
     * @returns The max temperature or undefined.
     */ getMaxTemperature() {
        let i = this.index.get($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName);
        if (i) return this.nodes.get(i);
    }
    /**
     * @param maxTemperature The max temperature.
     */ setMaxTemperature(maxTemperature) {
        let i = this.index.get($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName);
        if (i) this.nodes.set(i, maxTemperature);
        else {
            this.index.set($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName, this.nodes.size);
            this.addNode(maxTemperature);
        }
    }
    /**
     * Removes the max temperature.
     */ removeMaxTemperature() {
        let i = this.index.get($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete($f7e4eb4e898217f9$export$f9c72965e4ddfc8e.tagName);
        }
    }
}



class $69ecbdaa96f3962d$export$f99233281efd08a0 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        this.tagName = "me:title";
    }
    /**
     * @param value 
     */ constructor(attributes, value){
        super(attributes, $69ecbdaa96f3962d$export$f99233281efd08a0.tagName, value);
    }
}
class $69ecbdaa96f3962d$export$19d70f3647dee606 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "moleculeList";
    }
    /**
     * @param attributes The attributes.
     * @param molecules The molecules.
     */ constructor(attributes, molecules){
        super(attributes, $69ecbdaa96f3962d$export$19d70f3647dee606.tagName);
        this.index = new Map();
        if (molecules != undefined) molecules.forEach((molecule)=>{
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(molecule.getID(), this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the molecule.
     * @returns The molecule.
     */ getMolecule(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a molecule.
     * @param id The id of the molecule to remove.
     */ removeMolecule(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a molecule.
     * @param molecule The molecule.
     */ addMolecule(molecule) {
        let mID = molecule.getID();
        let index = this.index.get(mID);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log("Replaced molecule with id " + mID);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(mID, this.nodes.size - 1);
        }
    }
}
class $69ecbdaa96f3962d$export$44466a39ca846289 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactionList";
    }
    /**
     * @param attributes The attributes.
     * @param reactions The reactions.
     */ constructor(attributes, reactions){
        super(attributes, $69ecbdaa96f3962d$export$44466a39ca846289.tagName);
        this.index = new Map();
        if (reactions != undefined) reactions.forEach((reaction)=>{
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the reaction.
     * @returns The reaction.
     */ getReaction(id) {
        let i = this.index.get(id);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Remove a reaction.
     * @param id The id of the reaction to remove.
     */ removeReaction(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a reaction.
     * @param reaction The reaction.
     */ addReaction(reaction) {
        let index = this.index.get(reaction.id);
        if (index !== undefined) {
            this.nodes.set(index, reaction);
            console.log("Replaced reaction with id " + reaction.id);
        } else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
}
class $69ecbdaa96f3962d$export$3139ebae3f570365 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "conditionsList";
    }
    /**
     * @param attributes The attributes.
     * @param conditionss The conditions.
     */ constructor(attributes, conditionss){
        super(attributes, $69ecbdaa96f3962d$export$2be1c851e287a6b1.tagName);
        this.index = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The conditions.
     */ getConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a conditions.
     * @param conditions The conditions.
     */ addConditions(conditions) {
        let index = this.index.get(conditions.id);
        if (index != undefined) {
            this.nodes.set(index, conditions);
            console.log("Replaced conditions with id " + conditions.id);
        } else {
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        }
    }
}
class $69ecbdaa96f3962d$export$a46a5ec84602acfd extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "modelParametersList";
    }
    /**
     * @param attributes The attributes.
     * @param modelParameterss The modelParameters.
     */ constructor(attributes, modelParameterss){
        super(attributes, $69ecbdaa96f3962d$export$a46a5ec84602acfd.tagName);
        this.index = new Map();
        if (modelParameterss != undefined) modelParameterss.forEach((modelParameters)=>{
            this.nodes.set(this.nodes.size, modelParameters);
            this.index.set(modelParameters.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the modelParameters.
     * @returns The modelParameters.
     */ getModelParameters(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a modelParameters.
     * @param id The id of the modelParameters to remove.
     */ removeModelParameters(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a modelParameters.
     * @param modelParameters The modelParameters.
     */ addModelParameters(modelParameters) {
        let index = this.index.get(modelParameters.id);
        if (index != undefined) {
            this.nodes.set(index, modelParameters);
            console.log("Replaced modelParameters with id " + modelParameters.id);
        } else {
            this.nodes.set(this.nodes.size, modelParameters);
            this.index.set(modelParameters.id, this.nodes.size - 1);
        }
    }
}
class $69ecbdaa96f3962d$export$2be1c851e287a6b1 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "controlList";
    }
    /**
     * @param attributes The attributes.
     * @param controls The controls.
     */ constructor(attributes, controls){
        super(attributes, $69ecbdaa96f3962d$export$2be1c851e287a6b1.tagName);
        this.index = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The control.
     */ getControl(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeControl(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a control.
     * @param control The control.
     */ addControl(control) {
        let index = this.index.get(control.id);
        if (index !== undefined) {
            this.nodes.set(index, control);
            console.log("Replaced control with id " + control.id);
        } else {
            this.nodes.set(this.nodes.size, control);
            this.index.set(control.id, this.nodes.size - 1);
        }
    }
}
class $69ecbdaa96f3962d$export$692079bb871c6039 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        this.tagName = "me:mesmer";
    }
    static{
        /**
     * Precision options.
     */ this.precisionOptions = [
            "d",
            "dd",
            "qd",
            "double",
            "double-double",
            "quad-double"
        ];
    }
    static{
        /**
     * Pressure units.
     */ this.pressureUnits = [
            "Torr",
            "PPCC",
            "atm",
            "mbar",
            "psi",
            "mols/cc"
        ];
    }
    static{
        /**
     * Energy units.
     */ this.energyUnits = [
            "kJ/mol",
            "kJ per mol",
            "cm-1",
            "wavenumber",
            "kcal/mol",
            "kcal per mol",
            "Hartree",
            "au"
        ];
    }
    static{
        /**
     * Frequency units.
     */ this.frequencyUnits = [
            "cm-1",
            "GHz",
            "amuA^2"
        ];
    }
    static{
        /**
     * The atoms with 1 to 118 protons inclusive. (source: https://query.wikidata.org/#SELECT%20%3Felement%20%3Fsymbol%20%20%3Fprotons%0AWHERE%0A%7B%0A%20%20%3Felement%20wdt%3AP31%20wd%3AQ11344%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP1086%20%3Fprotons%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP246%20%3Fsymbol%20.%0A%7D%0A%0AORDER%20BY%20%3Fprotons)
     */ this.elementTypes = [
            "H",
            "He",
            "Li",
            "Be",
            "B",
            "C",
            "N",
            "O",
            "F",
            "Ne",
            "Na",
            "Mg",
            "Al",
            "Si",
            "P",
            "S",
            "Cl",
            "Ar",
            "K",
            "Ca",
            "Sc",
            "Ti",
            "V",
            "Cr",
            "Mn",
            "Fe",
            "Co",
            "Ni",
            "Cu",
            "Zn",
            "Ga",
            "Ge",
            "As",
            "Se",
            "Br",
            "Kr",
            "Rb",
            "Sr",
            "Y",
            "Zr",
            "Nb",
            "Mo",
            "Tc",
            "Ru",
            "Rh",
            "Pd",
            "Ag",
            "Cd",
            "In",
            "Sn",
            "Sb",
            "Te",
            "I",
            "Xe",
            "Cs",
            "Ba",
            "La",
            "Ce",
            "Pr",
            "Nd",
            "Pm",
            "Sm",
            "Eu",
            "Gd",
            "Tb",
            "Dy",
            "Ho",
            "Er",
            "Tm",
            "Yb",
            "Lu",
            "Hf",
            "Ta",
            "W",
            "Re",
            "Os",
            "Ir",
            "Pt",
            "Au",
            "Hg",
            "Tl",
            "Pb",
            "Bi",
            "Po",
            "At",
            "Rn",
            "Fr",
            "Ra",
            "Ac",
            "Th",
            "Pa",
            "U",
            "Np",
            "Pu",
            "Am",
            "Cm",
            "Bk",
            "Cf",
            "Es",
            "Fm",
            "Md",
            "No",
            "Lr",
            "Rf",
            "Db",
            "Sg",
            "Bh",
            "Hs",
            "Mt",
            "Ds",
            "Rg",
            "Cn",
            "Nh",
            "Fl",
            "Mc",
            "Lv",
            "Ts",
            "Og"
        ];
    }
    static{
        /**
     * Atomic mass map for atoms. The keys are element symbols, the values are the atomic mass according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomMasses = new Map();
    }
    static{
        /**
     * Atomic radius map for atoms. The keys are element symbols, the values are the atomic radii according to a periodic table.
     * (This is initialised in the constructor.)
     */ this.atomRadii = new Map();
    }
    static{
        /**
     * Colour map for atoms. The keys are element symbols, the values are the colours the element is assigned.
     * (This is initialised in the constructor.)
     */ this.atomColors = new Map();
    }
    static{
        /**
     * Colour map for bonds. The keys are bond order, the values are the colours the bond order is assigned.
     * (This is initialised in the constructor.)
     */ this.bondColors = new Map();
    }
    static{
        /**
     * The header of the XML file.
     */ this.header = `<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type='text/xsl' href='../../mesmer2.xsl' media='other'?>
<?xml-stylesheet type='text/xsl' href='../../mesmer1.xsl' media='screen'?>`;
    }
    /**
     * @param attributes The attributes.
     * @param moleculeList The molecule list.
     * @param reactionList The reaction list.
     * @param conditions The conditions.
     * @param modelParameters The model parameters.
     * @param controls The controls.
     */ constructor(attributes, title, moleculeList, reactionList, conditionss, modelParameterss, controls, metadataList, analysis){
        super(attributes, $69ecbdaa96f3962d$export$692079bb871c6039.tagName);
        let elements = [
            "H",
            "O",
            "C",
            "N",
            "Cl",
            "S",
            "Ph",
            "Fe"
        ];
        let colors = [
            "White",
            "Red",
            "DarkGrey",
            "Blue",
            "Green",
            "Yellow",
            "Orange",
            "Brown"
        ];
        for(let i = 0; i < elements.length; i++)$69ecbdaa96f3962d$export$692079bb871c6039.atomColors.set(elements[i], colors[i]);
        // Atomic mass units (amu)
        let masses = [
            1.00784,
            15.999,
            12.011,
            14.007,
            35.453,
            32.06,
            77.845,
            55.845
        ]; // Atomic masses (see https://en.wikipedia.org/wiki/Periodic_table).
        for(let i = 0; i < elements.length; i++)$69ecbdaa96f3962d$export$692079bb871c6039.atomMasses.set(elements[i], masses[i]);
        // Picometers (pm),
        let radii = [
            37,
            66,
            67,
            56,
            99,
            102,
            110,
            124
        ]; // Calculated radii between two atoms of the same type in a molecule (https://en.wikipedia.org/wiki/Atomic_radii_of_the_elements_(data_page)).
        for(let i = 0; i < elements.length; i++)$69ecbdaa96f3962d$export$692079bb871c6039.atomRadii.set(elements[i], radii[i]);
        let bondOrders = [
            1,
            1.5,
            2,
            2.5,
            3,
            3.5,
            4,
            4.5,
            5,
            5.5,
            6
        ];
        colors = [
            "Black",
            "Red",
            "DarkRed",
            "Blue",
            "DarkBlue",
            "Green",
            "DarkGreen",
            "Yellow",
            "DarkYellow",
            "Orange",
            "DarkOrange"
        ];
        for(let i = 0; i < bondOrders.length; i++)$69ecbdaa96f3962d$export$692079bb871c6039.bondColors.set(bondOrders[i], colors[i]);
        this.index = new Map();
        if (title != undefined) {
            this.index.set($69ecbdaa96f3962d$export$f99233281efd08a0.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (moleculeList != undefined) {
            this.index.set($69ecbdaa96f3962d$export$19d70f3647dee606.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
        if (reactionList != undefined) {
            this.index.set($69ecbdaa96f3962d$export$44466a39ca846289.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
        this.conditionsIndex = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.index.set((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName + conditions.id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        });
        this.modelParametersIndex = new Map();
        if (modelParameterss != undefined) modelParameterss.forEach((modelParameters)=>{
            this.index.set((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName + modelParameters.id, this.nodes.size);
            this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
            this.addNode(modelParameters);
        });
        this.controlIndex = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.index.set((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName + control.id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        });
        if (metadataList != undefined) {
            this.index.set((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, this.nodes.size);
            this.addNode(metadataList);
        }
        if (analysis != undefined) {
            this.index.set((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }
    /**
     * @returns The title.
     */ getTitle() {
        let i = this.index.get($69ecbdaa96f3962d$export$f99233281efd08a0.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the title.
     * @param title The title.
     */ setTitle(title) {
        let i = this.index.get($69ecbdaa96f3962d$export$f99233281efd08a0.tagName);
        if (i != undefined) this.nodes.set(i, title);
        else {
            this.index.set($69ecbdaa96f3962d$export$f99233281efd08a0.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * @returns The molecule list.
     */ getMoleculeList() {
        let i = this.index.get($69ecbdaa96f3962d$export$19d70f3647dee606.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the molecule list.
     * @param moleculeList The molecule list.
     */ setMoleculeList(moleculeList) {
        let i = this.index.get($69ecbdaa96f3962d$export$19d70f3647dee606.tagName);
        if (i != undefined) this.nodes.set(i, moleculeList);
        else {
            this.index.set($69ecbdaa96f3962d$export$19d70f3647dee606.tagName, this.nodes.size);
            this.addNode(moleculeList);
        }
    }
    /**
     * @returns The reaction list.
     */ getReactionList() {
        let i = this.index.get($69ecbdaa96f3962d$export$44466a39ca846289.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the reaction list.
     * @param reactionList The reaction list.
     */ setReactionList(reactionList) {
        let i = this.index.get($69ecbdaa96f3962d$export$44466a39ca846289.tagName);
        if (i != undefined) this.nodes.set(i, reactionList);
        else {
            this.index.set($69ecbdaa96f3962d$export$44466a39ca846289.tagName, this.nodes.size);
            this.addNode(reactionList);
        }
    }
    /**
     * Add a Conditions.
     * @param conditions The Conditions.
     */ addConditions(conditions) {
        let id = (0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName + conditions.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, conditions);
        else {
            this.index.set(id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @param conditionsID The id of the conditions.
     * @returns The conditions for the conditionsID.
     */ getConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The conditions as a Conditions[].
     */ getConditionss() {
        let conditionss = [];
        this.conditionsIndex.forEach((index, conditionsID)=>{
            conditionss.push(this.nodes.get(index));
        });
        return conditionss;
    }
    /**
     * Set the conditions.
     * @param conditionss The Conditions[].
     */ setConditionss(conditionss) {
        conditionss.forEach((conditions)=>{
            this.addConditions(conditions);
        });
    }
    /**
     * @returns The next control id.
     */ getNextConditionsID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.conditionsIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a conditions.
     * @param conditionsID The id of the conditions to remove.
     */ removeConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName + conditionsID);
            this.conditionsIndex.delete(conditionsID);
        }
    }
    /**
     * Add a ModelParameters.
     * @param modelParameters The ModelParameters.
     */ addModelParameters(modelParameters) {
        let id = (0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName + modelParameters.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, modelParameters);
        else {
            this.index.set(id, this.nodes.size);
            this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
            this.addNode(modelParameters);
        }
    }
    /**
     * @param modelParametersID The id of the modelParameters.
     * @returns The modelParameters for the modelParametersID.
     */ getModelParameters(modelParametersID) {
        let i = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The modelParameters as a ModelParameters[].
     */ getModelParameterss() {
        let modelParameterss = [];
        this.modelParametersIndex.forEach((index, modelParametersID)=>{
            modelParameterss.push(this.nodes.get(index));
        });
        return modelParameterss;
    }
    /**
     * Set the modelParameters.
     * @param modelParameterss The ModelParameters[].
     */ setModelParameterss(modelParameterss) {
        modelParameterss.forEach((modelParameters)=>{
            this.addModelParameters(modelParameters);
        });
    }
    /**
     * @returns The next modelParameters id.
     */ getNextModelParametersID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.modelParametersIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a modelParameters.
     * @param modelParametersID The id of the modelParameters to remove.
     */ removeModelParameters(modelParametersID) {
        let i = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName + modelParametersID);
            this.modelParametersIndex.delete(modelParametersID);
        }
    }
    /**
     * Add a Control.
     * @param control The Control.
     */ addControl(control) {
        let id = (0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName + control.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set(id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        }
    }
    /**
     * @returns The control.
     */ getControl(controlID) {
        let i = this.controlIndex.get(controlID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The controls.
     */ getControls() {
        let controls = [];
        this.controlIndex.forEach((index, controlID)=>{
            controls.push(this.nodes.get(index));
        });
        return controls;
    }
    /**
     * Set the controls.
     * @param controls The controls.
     */ setControls(controls) {
        controls.forEach((control)=>{
            this.addControl(control);
        });
    }
    /**
     * @returns The next control id.
     */ getNextControlID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.controlIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a control.
     * @param controlID The id of the control to remove.
     */ removeControl(controlID) {
        let i = this.controlIndex.get(controlID);
        //console.log("removeControl " + controlID + " " + i);
        //console.log("controlIndex " + arrayToString(Array.from(this.controlIndex.keys())));
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName + controlID);
            this.controlIndex.delete(controlID);
        }
    }
    /**
     * @returns The metadata list.
     */ getMetadataList() {
        let i = this.index.get((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param metadataList The metadata list.
     */ setMetadataList(metadataList) {
        let i = this.index.get((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        if (i != undefined) this.nodes.set(i, metadataList);
        else {
            this.index.set((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, this.nodes.size);
            this.addNode(metadataList);
        }
    }
    /**
     * @returns The analysis.
     */ getAnalysis() {
        let i = this.index.get((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param analysis The analysis.
     */ setAnalysis(analysis) {
        let i = this.index.get((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
        if (i != undefined) this.nodes.set(i, analysis);
        else {
            this.index.set((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }
}
class $69ecbdaa96f3962d$export$393edc798c47379d extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:description";
    }
    /**
     * @param attributes The attributes.
     * @param description The description.
     */ constructor(attributes, description){
        super(attributes, $69ecbdaa96f3962d$export$393edc798c47379d.tagName, description);
    }
}
class $69ecbdaa96f3962d$export$971d5caa766a69d7 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:T";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $69ecbdaa96f3962d$export$971d5caa766a69d7.tagName, value);
    }
}



class $01410cda1eef5011$export$80986e6afdd7e0cb extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "atom";
    }
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the elementType attribute.
     */ this.s_elementType = "elementType";
    }
    static{
        /**
     * The key for the x3 attribute.
     */ this.s_x3 = "x3";
    }
    static{
        /**
     * The key for the y3 attribute.
     */ this.s_y3 = "y3";
    }
    static{
        /**
     * The key for the z3 attribute.
     */ this.s_z3 = "z3";
    }
    /**
     * @param attributes The attributes. If there is no "elementType" key an error will be thrown.
     */ constructor(attributes, molecule){
        super(attributes, $01410cda1eef5011$export$80986e6afdd7e0cb.tagName);
        this.molecule = molecule;
    }
    /**
     * @returns True if the atom has coordinates.
     */ hasCoordinates() {
        if (this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_x3) != undefined && this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_y3) != undefined && this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_z3) != undefined) return true;
        return false;
    }
    /**
     * @returns The id.
     */ getID() {
        return this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_id);
    }
    /**
     * @param id The id.
     */ setID(id) {
        this.attributes.set($01410cda1eef5011$export$80986e6afdd7e0cb.s_id, id);
    }
    /**
     * @returns The element type.
     */ getElementType() {
        return this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_elementType);
    }
    /**
     * @param elementType The element type.
     */ setElementType(elementType) {
        this.attributes.set($01410cda1eef5011$export$80986e6afdd7e0cb.s_elementType, elementType);
    }
    /**
     * @returns The x3 attribute value as a Big or undefined.
     */ getX3() {
        let x3 = this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_x3);
        if (x3 != undefined) return new (0, $a227f0f1258db640$exports.Big)(x3);
    }
    /**
     * @param x3 The x3 attribute value.
     */ setX3(x3) {
        this.attributes.set($01410cda1eef5011$export$80986e6afdd7e0cb.s_x3, x3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeX3() {
        this.attributes.delete($01410cda1eef5011$export$80986e6afdd7e0cb.s_x3);
    }
    /**
     * @returns The y3 attribute value as a Big or undefined.
     */ getY3() {
        let y3 = this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_y3);
        if (y3 != undefined) return new (0, $a227f0f1258db640$exports.Big)(y3);
    }
    /**
     * @param y3 The y3 attribute value.
     */ setY3(y3) {
        this.attributes.set($01410cda1eef5011$export$80986e6afdd7e0cb.s_y3, y3.toString());
    }
    /**
     * Removes the y3 attribute.
     */ removeY3() {
        this.attributes.delete($01410cda1eef5011$export$80986e6afdd7e0cb.s_y3);
    }
    /**
     * @returns The z3 attribute value as a Big or undefined.
     */ getZ3() {
        let z3 = this.attributes.get($01410cda1eef5011$export$80986e6afdd7e0cb.s_z3);
        if (z3 != undefined) return new (0, $a227f0f1258db640$exports.Big)(z3);
    }
    /**
     * @param z3 The z3 attribute value.
     */ setZ3(z3) {
        this.attributes.set("z3", z3.toString());
    }
    /**
     * Removes the x3 attribute.
     */ removeZ3() {
        this.attributes.delete("z3");
    }
}
class $01410cda1eef5011$export$9cea715eceba39a0 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
    * The tag name.
    */ this.tagName = "atomArray";
    }
    /**
     * @param attributes The attributes.
     * @param atoms The atoms.
     */ constructor(attributes, atoms){
        super(attributes, $01410cda1eef5011$export$9cea715eceba39a0.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (atoms == undefined) this.atoms = new Map();
        else {
            this.atoms = atoms;
            atoms.forEach((atom, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, atom);
            });
        }
    }
    /**
     * @param id The id of the atom to get.
     * @returns The atom with the given id.
     */ getAtom(id) {
        return this.atoms.get(id);
    }
    /**
     * @param atom The atom to add.
     * @returns The id of the atom.
     */ addAtom(atom, aID) {
        //console.log('Adding atom...');
        if (aID == undefined) {
            let id = atom.getID();
            if (id == undefined) {
                id = this.getNextAtomID();
                atom.setID(id);
            } else if (this.atoms.has(id)) {
                let newID = this.getNextAtomID();
                console.warn("Atom with id " + id + " already exists, adding with id " + newID);
                atom.setID(newID);
                id = newID;
            }
            aID = id;
        }
        //console.log('Atom id: ' + id);
        this.index.set(aID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, aID);
        this.nodes.set(this.nodes.size, atom);
        this.atoms.set(aID, atom);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ return aID;
    }
    /**
     * @returns The atomId.
     */ getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        if (this.atoms.has(id)) while(this.atoms.has(id)){
            i++;
            id = "a" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeAtom(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Atom with id " + id + " does not exist!");
        console.log("Removing atom with id " + id);
        this.atoms.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
    /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ }
    /**
     * @param i The index of the atom to remove.
     * @param id The id of the atom to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
    }
}
class $01410cda1eef5011$export$153327fc99ac0c53 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bond";
    }
    static{
        /**
     * The key for the atomRefs2 attribute.
     */ this.s_atomRefs2 = "atomRefs2";
    }
    static{
        /**
     * The key for the id attribute.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the order attribute.
     */ this.s_order = "order";
    }
    static{
        /**
     * The order options.
     */ this.orderOptions = [
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
            "5.5",
            "6"
        ];
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, molecule){
        super(attributes, $01410cda1eef5011$export$153327fc99ac0c53.tagName);
        this.molecule = molecule;
    }
    /**
     * @returns The atomRefs2.
     */ getAtomRefs2() {
        let atomRefs2 = this.attributes.get($01410cda1eef5011$export$153327fc99ac0c53.s_atomRefs2);
        let atomRefs = atomRefs2?.split(" ") || [];
        if (atomRefs2 == undefined) return "a1 a1";
        return atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */ setAtomRefs2(atomRefs2) {
        this.attributes.set($01410cda1eef5011$export$153327fc99ac0c53.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The id.
     */ getID() {
        return this.attributes.get($01410cda1eef5011$export$153327fc99ac0c53.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */ setID(id) {
        this.attributes.set($01410cda1eef5011$export$153327fc99ac0c53.s_id, id);
    }
    /**
     * @returns The attribute value referred to by "order" as a number or undefined.
     */ getOrder() {
        let order = this.attributes.get($01410cda1eef5011$export$153327fc99ac0c53.s_order);
        if (order != undefined) return parseFloat(order);
    }
    /**
     * @param order The order to set the attribute value referred to by "order".
     */ setOrder(order) {
        this.attributes.set($01410cda1eef5011$export$153327fc99ac0c53.s_order, order.toString());
    }
}
class $01410cda1eef5011$export$746fba2e30d93fe6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "bondArray";
    }
    /**
     * @param attributes The attributes.
     * @param bonds The bonds.
     */ constructor(attributes, bonds){
        super(attributes, $01410cda1eef5011$export$746fba2e30d93fe6.tagName);
        this.index = new Map();
        this.reverseIndex = new Map();
        if (bonds == undefined) this.bonds = new Map();
        else {
            this.bonds = bonds;
            bonds.forEach((bond, id)=>{
                this.index.set(id, this.nodes.size);
                this.reverseIndex.set(this.nodes.size, id);
                this.nodes.set(this.nodes.size, bond);
            });
        }
    }
    /**
     * @returns The bond ids.
     */ getBondIds() {
        return Array.from(this.bonds.keys());
    }
    /**
     * @param id The id of the bond to get.
     * @returns The bond with the given id.
     */ getBond(id) {
        return this.bonds.get(id);
    }
    /**
     * Adds a bond to the array.
     * @param bond The bond to add.
     * @param bID The id of the bond to add if it already exists.
     * @returns The id of the bond.
     */ addBond(bond, bID) {
        if (bID == undefined) {
            let id = bond.getID();
            if (id == undefined) {
                id = this.getNextBondID();
                bond.setID(id);
            } else if (this.bonds.has(id)) {
                let newID = this.getNextBondID();
                console.log("Bond with id " + id + " already exists, adding with id " + newID);
                bond.setID(newID);
                id = newID;
            }
            bID = id;
        }
        //console.log('Bond id: ' + id);
        this.index.set(bID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, bID);
        this.nodes.set(this.nodes.size, bond);
        this.bonds.set(bID, bond);
        /*
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.reverseIndex.keys() ' + Array.from(this.reverseIndex.keys()));
        console.log('this.reverseIndex.values() ' + Array.from(this.reverseIndex.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ return bID;
    }
    /**
     * @returns The atomId.
     */ getNextBondID() {
        let i = 1;
        let id = "b" + i.toString();
        while(this.bonds.has(id)){
            i++;
            id = "b" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeBond(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error("Bond with id " + id + " does not exist!");
        console.log("Removing bond with id " + id);
        this.bonds.delete(id);
        //this.index.delete(id);
        //this.nodes.delete(i);
        this.deleteNodeAndReindex(i, id);
    /*
        console.log('i ' + i);
        console.log('this.index.size ' + this.index.size);
        console.log('this.nodes.size ' + this.nodes.size);
        console.log('this.atoms.size ' + this.atoms.size);
        console.log('this.index.keys() ' + Array.from(this.index.keys()));
        console.log('this.index.values() ' + Array.from(this.index.values()));
        console.log('this.nodes.keys() ' + Array.from(this.nodes.keys()));
        console.log('this.atoms.keys() ' + Array.from(this.atoms.keys()));
        */ }
    /**
     * @param i The index of the bond to remove.
     * @param id The id of the bond to remove.
     */ deleteNodeAndReindex(i, id) {
        this.nodes.delete(i);
        this.index.delete(id);
        this.reverseIndex.delete(i);
        let newNodes = new Map();
        let newIndex = new Map();
        let newReverseIndex = new Map();
        this.index.forEach((value, key)=>{
            if (value > i) {
                newNodes.set(value - 1, this.nodes.get(value));
                newIndex.set(key, value - 1);
                newReverseIndex.set(value - 1, key);
            } else {
                newNodes.set(value, this.nodes.get(value));
                newIndex.set(key, value);
                newReverseIndex.set(value, key);
            }
        });
        this.nodes = newNodes;
        this.index = newIndex;
        this.reverseIndex = newReverseIndex;
    }
}
class $01410cda1eef5011$export$eb6936faa5f138bb extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$eb6936faa5f138bb.tagName, value);
    }
    /**
     * @returns The value.
     */ getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */ setValue(val) {
        this.value = val;
    }
}
class $01410cda1eef5011$export$742f9ce317ef8ba3 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$742f9ce317ef8ba3.tagName, value);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get($01410cda1eef5011$export$742f9ce317ef8ba3.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) //console.log('Units are not the same, changing units...');
                this.attributes.set($01410cda1eef5011$export$742f9ce317ef8ba3.s_units, units);
            }
        }
    }
    /**
     * @returns The value.
     */ getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */ setValue(val) {
        this.value = val;
    }
}
class $01410cda1eef5011$export$9f93a3fdf2490572 extends (0, $cc8c7201a9bad777$export$38d8ebe2767f8865) {
    static{
        /**
     * The tag name.
     */ this.tagName = "array";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    static{
        this.propertyDictRefs = new Set([
            "me:ZPE",
            "me:Hf0",
            "me:HfAT0",
            "me:Hf298",
            "me:rotConsts",
            "me:symmetryNumber",
            "me:TSOpticalSymmetryNumber",
            "me:frequenciesScaleFactor",
            "me:vibFreqs",
            "me:MW",
            "me:spinMultiplicity",
            "me:epsilon",
            "me:sigma",
            "me:hessian",
            "me:EinsteinAij",
            "me:EinsteinBij"
        ]);
    }
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, $01410cda1eef5011$export$9f93a3fdf2490572.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get($01410cda1eef5011$export$9f93a3fdf2490572.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set($01410cda1eef5011$export$9f93a3fdf2490572.s_units, units);
                    console.log("Units changed from " + existingUnits + " to " + units);
                }
            }
        }
    }
}
class $01410cda1eef5011$export$a5a2be813176eb0e extends (0, $cc8c7201a9bad777$export$38d8ebe2767f8865) {
    static{
        /**
     * The tag name.
     */ this.tagName = "matrix";
    }
    static{
        /**
     * The key for the rows attribute.
     */ this.s_rows = "rows";
    }
    static{
        /**
     * The key for the matrixType attribute.
     */ this.s_matrixType = "matrixType";
    }
    static{
        /**
     * The key for the units attribute.
     */ this.s_units = "units";
    }
    /**
     * @param attributes The attributes.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, values, delimiter){
        super(attributes, $01410cda1eef5011$export$9f93a3fdf2490572.tagName, values, delimiter);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get($01410cda1eef5011$export$9f93a3fdf2490572.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) {
                    this.attributes.set($01410cda1eef5011$export$9f93a3fdf2490572.s_units, units);
                    console.log("Units changed from " + existingUnits + " to " + units);
                }
            }
        }
    }
}
class $01410cda1eef5011$export$41b04b3a73e7216d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "property";
    }
    static{
        /**
     * The key for the dictRef attribute.
     */ this.s_dictRef = "dictRef";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, $01410cda1eef5011$export$41b04b3a73e7216d.tagName);
        let dictRef = attributes.get($01410cda1eef5011$export$41b04b3a73e7216d.s_dictRef);
        if (dictRef == undefined) {
            // If there is no dictRef, then try setting this from the "title" attribute.
            let title = attributes.get("title");
            if (title == undefined) throw new Error($01410cda1eef5011$export$41b04b3a73e7216d.s_dictRef + " and title are undefined!");
            else {
                if (title == "MW") dictRef = "me:MW";
                else if (title == "Hf298") dictRef = "me:Hf298";
                else if (title == "Hf0") dictRef = "me:Hf0";
                else if (title == "program") dictRef = "program";
                else if (title == "basis") dictRef = "basis";
                else if (title == "method") dictRef = "method";
                else if (title == "File Format") dictRef = "method";
                else throw new Error("Title " + title + "not recognised!");
            }
        }
        this.dictRef = dictRef;
        if (property) this.nodes.set(0, property);
    }
    /**
     * @returns The property.
     */ getProperty() {
        return this.nodes.get(0);
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        this.nodes.set(0, property);
    }
}
class $01410cda1eef5011$export$95174cf0748f45cd extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:ZPE";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class $01410cda1eef5011$export$90bccbae54bb6d4f extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:Hf0";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class $01410cda1eef5011$export$a4fe62a56eafa45d extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:HfAT0";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class $01410cda1eef5011$export$e7df60530792b964 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:Hf298";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
    /**
     * @param units The units.
     * Should be one of Mesmer.energyUnits.
     */ setUnits(units) {
        this.getProperty().updateUnits(units);
    }
}
class $01410cda1eef5011$export$984abe26ded13ee0 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:rotConsts";
    }
    static{
        /**
     * The units.
     */ this.unitOptions = [
            "cm-1",
            "GHz",
            "amuA^2"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$d1d1720eff14586a extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:symmetryNumber";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$886461cafebcdaed extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:TSOpticalSymmetryNumber";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$1288989e9be37590 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:frequenciesScaleFactor";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$2762c8fbc03043ca extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:vibFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$a3772f6eb527275b extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:MW";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$415ad1120b60f9f3 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:spinMultiplicity";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$cb998ac70542b2c3 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:epsilon";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$79e850ed2864d13d extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:sigma";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$789e4dcdcb815c05 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:hessian";
    }
    static{
        /**
     * The units.
     */ this.unitOptions = [
            "kJ/mol/\xc52",
            "kcal/mol/\xc52",
            "Hartree/\xc52"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$f3e9ef5020c299b5 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:EinsteinAij";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$25f02bc420569a7e extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:EinsteinBij";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$22995ecd2bdeb2 extends $01410cda1eef5011$export$41b04b3a73e7216d {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:imFreqs";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class $01410cda1eef5011$export$4e0d1ad7ad6a0802 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "propertyList";
    }
    /**
     * @param attributes The attributes.
     * @param properties The properties (optional).
     */ constructor(attributes, properties){
        super(attributes, $01410cda1eef5011$export$4e0d1ad7ad6a0802.tagName);
        this.index = new Map();
        if (properties != undefined) properties.forEach((property)=>{
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        });
    }
    /**
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) return this.nodes.get(i);
        else throw new Error("Property " + dictRef + " does not exist");
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            //console.log('Property ' + property.dictRef + ' does not exist, adding...');
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        } else {
            console.log("Property " + property.dictRef + " already exists, updating...");
            this.nodes.set(i, property);
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     */ removeProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(dictRef);
            let newIndex = new Map();
            this.index.forEach((value, key)=>{
                if (value > i) newIndex.set(key, value - 1);
                else newIndex.set(key, value);
            });
            this.index = newIndex;
        }
    }
}
class $01410cda1eef5011$export$16fc56ab40b12b45 extends (0, $955343e59cd8f503$export$d0e9917d83c120a0) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown";
    }
    static{
        /**
     * The key for the bathGas attribute.
     */ this.s_bathGas = "bathGas";
    }
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$16fc56ab40b12b45.tagName, value);
    }
    /**
     * @returns The bath gas of the DeltaEDown.
     */ getBathGas() {
        return this.attributes.get($01410cda1eef5011$export$16fc56ab40b12b45.s_bathGas);
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */ setBathGas(bathGas) {
        this.attributes.set($01410cda1eef5011$export$16fc56ab40b12b45.s_bathGas, bathGas);
    }
}
class $01410cda1eef5011$export$1aede585378507cb extends $01410cda1eef5011$export$16fc56ab40b12b45 {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown2";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class $01410cda1eef5011$export$f8ecc5f7f62d6fbf extends (0, $955343e59cd8f503$export$d0e9917d83c120a0) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownTExponent";
    }
    static{
        /**
     * The referenceTemperature attribute key.
     */ this.s_referenceTemperature = "referenceTemperature";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$f8ecc5f7f62d6fbf.tagName, value);
    }
    /**
     * @returns The referenceTemperature.
     */ getReferenceTemperature() {
        return parseFloat((0, $134d19e749bf0414$export$3988ae62b71be9a3)(this.attributes, $01410cda1eef5011$export$f8ecc5f7f62d6fbf.s_referenceTemperature));
    }
    /**
     * @param referenceTemperature The referenceTemperature.
     */ setReferenceTemperature(referenceTemperature) {
        this.attributes.set($01410cda1eef5011$export$f8ecc5f7f62d6fbf.s_referenceTemperature, referenceTemperature.toString());
    }
}
class $01410cda1eef5011$export$fbea747a02da7eb8 extends (0, $955343e59cd8f503$export$d0e9917d83c120a0) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownLinEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$fbea747a02da7eb8.tagName, value);
    }
}
class $01410cda1eef5011$export$499950da20810ac9 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:energyTransferModel";
    }
    /**
     * @param attributes The attributes.
     * @param deltaEDowns The DeltaEDowns.
     */ constructor(attributes, deltaEDowns){
        super(attributes, $01410cda1eef5011$export$499950da20810ac9.tagName);
        if (deltaEDowns != undefined) deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @returns The DeltaEDowns.
     */ getDeltaEDowns() {
        let deltaEDowns = [];
        this.nodes.forEach((node)=>{
            if (node instanceof $01410cda1eef5011$export$16fc56ab40b12b45) deltaEDowns.push(node);
        });
        return deltaEDowns;
    }
    /**
     * @param deltaEDowns The DeltaEDowns.
     */ setDeltaEDowns(deltaEDowns) {
        this.nodes.clear();
        deltaEDowns.forEach((deltaEDown)=>{
            this.nodes.set(this.nodes.size, deltaEDown);
        });
    }
    /**
     * @param index The index of the DeltaEDown to return.
     * @returns The DeltaEDown at the given index.
     */ getDeltaEDown(index) {
        if (index < 0 || index >= this.nodes.size) throw new Error("index out of range");
        return this.nodes.get(index);
    }
    /**
     * Set the DeltaEDown at the given index.
     * @param index The index to set the DeltaEDown at.
     * @param deltaEDown The DeltaEDown to set at the index.
     */ setDeltaEDown(index, deltaEDown) {
        this.nodes.set(index, deltaEDown);
    }
    /**
     * Add the DeltaEDowns.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */ addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
}
class $01410cda1eef5011$export$bbdce6c921702068 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DOSCMethod";
    }
    static{
        /**
     * The options for the "xsi:type" or "name" attribute value.
     */ this.xsi_typeOptions = [
            "ClassicalRotors",
            "QMRotors",
            "me:ClassicalRotors",
            "me:QMRotors"
        ];
    }
    static{
        /**
     * The key for the "xsi:type" attribute value.
     */ this.s_xsi_type = "xsi:type";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $01410cda1eef5011$export$bbdce6c921702068.tagName);
        if (attributes.get($01410cda1eef5011$export$bbdce6c921702068.s_xsi_type) == undefined) {
            let name = attributes.get("name");
            if (name == undefined) throw new Error("Neither xsi:type or name are defined.");
            else attributes.set($01410cda1eef5011$export$bbdce6c921702068.s_xsi_type, name);
        }
    }
    /**
     * @returns The xsi:type.
     */ getXsiType() {
        return this.attributes.get($01410cda1eef5011$export$bbdce6c921702068.s_xsi_type);
    }
    /**
     * @param xsiType The xsi:type.
     */ setXsiType(xsiType) {
        this.attributes.set($01410cda1eef5011$export$bbdce6c921702068.s_xsi_type, xsiType);
    }
}
class $01410cda1eef5011$export$aef8e5ad5552fd72 extends (0, $cc8c7201a9bad777$export$8f67221c6fb2ad09) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:bondRef";
    }
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     */ constructor(attributes, bondRef){
        super(attributes, $01410cda1eef5011$export$aef8e5ad5552fd72.tagName, bondRef);
    }
}
class $01410cda1eef5011$export$86ca5149fcde8feb extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PotentialPoint";
    }
    static{
        /**
     * The key angle attribute.
     */ this.s_angle = "angle";
    }
    static{
        /**
     * The key potential attribute.
     */ this.s_potential = "potential";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $01410cda1eef5011$export$86ca5149fcde8feb.tagName);
    }
    /**
     * @returns The angle.
     */ getAngle() {
        return this.attributes.get($01410cda1eef5011$export$86ca5149fcde8feb.s_angle);
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */ setAngle(angle) {
        this.attributes.set($01410cda1eef5011$export$86ca5149fcde8feb.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */ getPotential() {
        return this.attributes.get($01410cda1eef5011$export$86ca5149fcde8feb.s_potential);
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */ setPotential(potential) {
        this.attributes.set($01410cda1eef5011$export$86ca5149fcde8feb.s_potential, potential.toString());
    }
}
class $01410cda1eef5011$export$3f9657e7f71262a extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DistributionCalcMethod";
    }
    static{
        /**
     * The key for the default attribute.
     */ this.s_default = "default";
    }
    static{
        /**
     * The key for the name attribute.
     */ this.s_name = "name";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $01410cda1eef5011$export$3f9657e7f71262a.tagName);
    }
    /**
     * @returns The default.
     */ getDefault() {
        return this.attributes.get($01410cda1eef5011$export$3f9657e7f71262a.s_default);
    }
    /**
     * @param default The default.
     *
    setDefault(defaultValue: string): void {
        this.attributes.set(DistributionCalcMethod.s_default, defaultValue);
    }
    */ /**
     * @returns The name.
     */ getName() {
        return this.attributes.get($01410cda1eef5011$export$3f9657e7f71262a.s_name);
    }
}
class $01410cda1eef5011$export$3ee0c201412b230 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:thermoValue";
    }
    static{
        /**
     * The key for the T attribute.
     */ this.s_T = "T";
    }
    static{
        /**
     * The key for the H attribute.
     */ this.s_H = "H";
    }
    static{
        /**
     * The key for the S attribute.
     */ this.s_S = "S";
    }
    static{
        /**
     * The key for the G attribute.
     */ this.s_G = "G";
    }
    static{
        /**
     * The key for the Cp attribute.
     */ this.s_Cp = "Cp";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $01410cda1eef5011$export$80986e6afdd7e0cb.tagName);
    }
    /**
     * @returns The temperature.
     */ getT() {
        return new (0, $a227f0f1258db640$exports.Big)(this.attributes.get($01410cda1eef5011$export$3ee0c201412b230.s_T));
    }
    /**
     * @param T The temperature.
     *
    setT(T: Big): void {
        this.attributes.set(ThermoValue.s_T, T.toString());
    }

    /**
     * @returns The enthalpy.
     */ getH() {
        return new (0, $a227f0f1258db640$exports.Big)(this.attributes.get($01410cda1eef5011$export$3ee0c201412b230.s_H));
    }
    /**
     * @param H The enthalpy.
     *
    setH(H: Big): void {
        this.attributes.set(ThermoValue.s_H, H.toString());
    }

    /**
     * @returns The entropy.
     */ getS() {
        return new (0, $a227f0f1258db640$exports.Big)(this.attributes.get($01410cda1eef5011$export$3ee0c201412b230.s_S));
    }
    /**
     * @param S The entropy.
     *
    setS(S: Big): void {
        this.attributes.set(ThermoValue.s_S, S.toString());
    }

    /**
     * @returns The Gibbs free energy.
     */ getG() {
        return new (0, $a227f0f1258db640$exports.Big)(this.attributes.get($01410cda1eef5011$export$3ee0c201412b230.s_G));
    }
    /**
     * @param G The Gibbs free energy.
     *
    setG(G: Big): void {
        this.attributes.set(ThermoValue.s_G, G.toString());
    }

    /**
     * @returns The heat capacity.
     */ getCp() {
        return new (0, $a227f0f1258db640$exports.Big)(this.attributes.get($01410cda1eef5011$export$3ee0c201412b230.s_Cp));
    }
    /**
     * @param Cp The heat capacity.
     *
    setCp(Cp: Big): void {
        this.attributes.set(ThermoValue.s_Cp, Cp.toString());
    }

    /**
     * @returns The ThermoValue as a string array.
     */ toStringArray() {
        return [
            this.getT().toString(),
            this.getH().toString(),
            this.getS().toString(),
            this.getG().toString(),
            this.getCp().toString()
        ];
    }
    /**
     * @returns The ThermoValue as a CSV string.
     */ toCSV() {
        //console.log(this.toStringArray());
        //console.log(this.toStringArray().join(","));
        return this.toStringArray().join(",");
    }
}
class $01410cda1eef5011$export$96f29f03cf201f97 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:thermoTable";
    }
    static{
        /**
     * The key for the unitsT attribute.
     */ this.s_unitsT = "unitsT";
    }
    static{
        /**
     * The key for the unitsH attribute.
     */ this.s_unitsH = "unitsH";
    }
    static{
        /**
     * The key for the unitsS attribute.
     */ this.s_unitsS = "unitsS";
    }
    static{
        /**
     * The key for the unitsG attribute.
     */ this.s_unitsG = "unitsG";
    }
    static{
        /**
     * The key for the unitsCp attribute.
     */ this.s_unitsCp = "unitsCp";
    }
    /**
     * @param attributes The attributes.
     * @param tvs The ThermoValue array.
     */ constructor(attributes, tvs){
        super(attributes, $01410cda1eef5011$export$96f29f03cf201f97.tagName);
        if (tvs != undefined) {
            tvs.forEach((tv)=>{
                this.addNode(tv);
            });
            this.tvs = tvs;
        } else this.tvs = [];
    }
    /**
     * Retrieves a ThermoValue from the tvs array at a specific index.
     * 
     * @param i The index of the ThermoValue to return. 
     * @returns The ThermoValue at the given index.
     * @throws IndexError if i is out of the bounds of the tvs array.
     * @throws TypeError if tvs is null or undefined.
     */ get(i) {
        return this.tvs[i];
    }
    /**
     * Set the ThermoValue in t.
     * 
     * @param i The index of the ThermoValue to set.
     * @returns The PT pairs.
     */ set(i, tv) {
        this.nodes.set(i, tv);
        this.tvs[i] = tv;
    }
    /**
     * Add a ThermoValue.
     * 
     * @param tv The ThermoValue to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ add(tv) {
        this.addNode(tv);
        this.tvs.push(tv);
        return this.nodes.size - 1;
    }
    /**
     * Remove the ThermoValue at the given index.
     * 
     * @param i The index.
     */ remove(i) {
        this.nodes.delete(i);
        this.tvs.splice(i, 1);
    }
    /**
     * Initialise tvs.
     * 
     * @param tvs The tvs to be set.
     */ init(tvs) {
        this.clear();
        tvs.forEach((tv)=>{
            this.addNode(tv);
            this.tvs.push(tv);
        });
    }
    /**
     * Clear.
     */ clear() {
        this.nodes.clear();
        this.tvs = [];
    }
    /**
     * @returns The ThermoTable header as a string array.
     */ getHeader() {
        return [
            "T (" + this.attributes.get($01410cda1eef5011$export$96f29f03cf201f97.s_unitsT) + ")",
            "H(T)-H(0) (" + this.attributes.get($01410cda1eef5011$export$96f29f03cf201f97.s_unitsH) + ")",
            "S(T) (" + this.attributes.get($01410cda1eef5011$export$96f29f03cf201f97.s_unitsS) + ")",
            "G(T) (" + this.attributes.get($01410cda1eef5011$export$96f29f03cf201f97.s_unitsG) + ")",
            "Cp(T) (" + this.attributes.get($01410cda1eef5011$export$96f29f03cf201f97.s_unitsCp) + ")"
        ];
    }
    /**
     * @returns The ThermoTable as a CSV string.
     */ toCSV() {
        let csv = this.getHeader().join(",") + "\n";
        this.tvs.forEach((tv)=>{
            csv += tv.toCSV() + "\n";
        });
        return csv;
    }
}
class $01410cda1eef5011$export$9b8e857b9a081d2 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:HinderedRotorPotential";
    }
    static{
        /**
     * The permitted formats.
     */ this.formats = new Set([
            "numerical",
            "analytical"
        ]);
    }
    static{
        /**
     * The key for the format attribute value.
     */ this.s_format = "format";
    }
    static{
        /**
     * The key for the units attribute value.
     */ this.s_units = "units";
    }
    static{
        /**
     * The key for the expansionSize attribute value.
     */ this.s_expansionSize = "expansionSize";
    }
    static{
        /**
     * The key for the useSineTerms attribute value.
     */ this.s_useSineTerms = "useSineTerms";
    }
    /**
     * @param attributes The attributes.
     * @param potentialPoints The PotentialPoints.
     */ constructor(attributes, potentialPoints){
        super(attributes, $01410cda1eef5011$export$9b8e857b9a081d2.tagName);
        let format = attributes.get($01410cda1eef5011$export$9b8e857b9a081d2.s_format);
        if (format == undefined) throw new Error($01410cda1eef5011$export$9b8e857b9a081d2.s_format + " is undefined!");
        this.format = format;
        let units = attributes.get($01410cda1eef5011$export$9b8e857b9a081d2.s_units);
        if (units == undefined) throw new Error($01410cda1eef5011$export$9b8e857b9a081d2.s_units + " is undefined!");
        this.units = units;
        if (potentialPoints != undefined) potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
        let useSineTerms = attributes.get($01410cda1eef5011$export$9b8e857b9a081d2.s_useSineTerms);
        if (useSineTerms == undefined) this.useSineTerms = false;
        else this.useSineTerms = true;
    //this.useSineTerms = (useSineTerms == "yes");
    }
    /**
     * @returns The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ getFormat() {
        return this.format;
    }
    /**
     * @param format The format of the HinderedRotorPotential.
     * Should be one of ["numerical", "analytical"].
     */ setFormat(format) {
        this.format = format;
        this.attributes.set($01410cda1eef5011$export$9b8e857b9a081d2.s_format, format);
    }
    /**
     * @returns The units of the HinderedRotorPotential.
     * Should be one of Mesmer.energyUnits.
     */ getUnits() {
        return this.units;
    }
    /**
     * @param units The units of the HinderedRotorPotential.
     * Should be one of ["kJ/mol", "cm-1", "Hartree"].
     */ setUnits(units) {
        this.units = units;
        this.attributes.set($01410cda1eef5011$export$9b8e857b9a081d2.s_units, units);
    }
    /**
     * @returns The expansionSize of the HinderedRotorPotential.
     */ getExpansionSize() {
        return this.attributes.get($01410cda1eef5011$export$9b8e857b9a081d2.s_expansionSize);
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */ setExpansionSize(expansionSize) {
        console.log(expansionSize.toString());
        this.attributes.set($01410cda1eef5011$export$9b8e857b9a081d2.s_expansionSize, expansionSize.toString());
    }
    /**
     * @returns The useSineTerms of the HinderedRotorPotential.
     */ getUseSineTerms() {
        return this.useSineTerms;
    }
    /**
     * @param useSineTerms The useSineTerms of the HinderedRotorPotential.
     */ setUseSineTerms(useSineTerms) {
        this.useSineTerms = useSineTerms;
        this.attributes.set($01410cda1eef5011$export$9b8e857b9a081d2.s_useSineTerms, useSineTerms ? "yes" : "no");
    }
    /**
     * @returns The potential point with the given index.
     */ getPotentialPoint(i) {
        return this.nodes.get(i);
    }
    /**
     * Set the potential point at the given index.
     * @param i The index to set the potential point at.
     * @param p The potential point to set at the index.
     */ setPotentialPoint(i, p) {
        this.nodes.set(i, p);
    }
    /**
     * Sets the potential points.
     * @param potentialPoints The potential points.
     */ setPotentialPoints(potentialPoints) {
        this.nodes.clear();
        potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */ addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
    }
    /**
     * @param i The index of the potential point to remove.
     */ removePotentialPoint(i) {
        this.nodes.delete(i);
    }
}
class $01410cda1eef5011$export$9513c16afdf7d852 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        this.tagName = "me:periodicity";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$9513c16afdf7d852.tagName, value);
    }
}
class $01410cda1eef5011$export$ae98b7db6376163d extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:ExtraDOSCMethod";
    }
    /**
     * @param attributes The attributes.
     * @param bondRef The bondRef.
     * @param hinderedRotorPotential The HinderedRotorPotential.
     * @param periodicity The Periodicity.
     */ constructor(attributes, bondRef, hinderedRotorPotential, periodicity){
        super(attributes, $01410cda1eef5011$export$ae98b7db6376163d.tagName);
        this.index = new Map();
        if (bondRef) {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set($01410cda1eef5011$export$aef8e5ad5552fd72.tagName, this.nodes.size - 1);
        }
        if (hinderedRotorPotential) {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set($01410cda1eef5011$export$9b8e857b9a081d2.tagName, this.nodes.size - 1);
        }
        if (periodicity) {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set($01410cda1eef5011$export$9513c16afdf7d852.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The bondRef.
     */ getBondRef() {
        let i = this.index.get($01410cda1eef5011$export$aef8e5ad5552fd72.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the bondRef.
     * @param bondRef The bondRef.
     */ setBondRef(bondRef) {
        let i = this.index.get($01410cda1eef5011$export$aef8e5ad5552fd72.tagName);
        if (i != undefined) this.nodes.set(i, bondRef);
        else {
            this.nodes.set(this.nodes.size, bondRef);
            this.index.set($01410cda1eef5011$export$aef8e5ad5552fd72.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The hindered rotor potential of the molecule.
     */ getHinderedRotorPotential() {
        let i = this.index.get($01410cda1eef5011$export$9b8e857b9a081d2.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the hindered rotor potential.
     * @param hinderedRotorPotential The hindered rotor potential.
     */ setHinderedRotorPotential(hinderedRotorPotential) {
        let i = this.index.get($01410cda1eef5011$export$9b8e857b9a081d2.tagName);
        if (i != undefined) this.nodes.set(i, hinderedRotorPotential);
        else {
            this.nodes.set(this.nodes.size, hinderedRotorPotential);
            this.index.set($01410cda1eef5011$export$9b8e857b9a081d2.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The periodicity of the molecule.
     */ getPeriodicity() {
        let i = this.index.get($01410cda1eef5011$export$9513c16afdf7d852.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the periodicity.
     * @param periodicity The periodicity.
     */ setPeriodicity(periodicity) {
        let i = this.index.get($01410cda1eef5011$export$9513c16afdf7d852.tagName);
        if (i != undefined) this.nodes.set(i, periodicity);
        else {
            this.nodes.set(this.nodes.size, periodicity);
            this.index.set($01410cda1eef5011$export$9513c16afdf7d852.tagName, this.nodes.size - 1);
        }
    }
}
class $01410cda1eef5011$export$97850fe2f2906f00 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:reservoirSize";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$97850fe2f2906f00.tagName, value);
    }
}
class $01410cda1eef5011$export$656e8af5996be26 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:qtot";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$656e8af5996be26.tagName, value);
    }
}
class $01410cda1eef5011$export$c8de58561fc3a710 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sumc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$c8de58561fc3a710.tagName, value);
    }
}
class $01410cda1eef5011$export$159051b21d796f59 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sumg";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, $01410cda1eef5011$export$159051b21d796f59.tagName, value);
    }
}
class $01410cda1eef5011$export$126b026a4280c589 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:densityOfStates";
    }
    static{
        /**
     * The header.
     */ this.header = [
            (0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName,
            $01410cda1eef5011$export$656e8af5996be26.tagName,
            $01410cda1eef5011$export$c8de58561fc3a710.tagName,
            $01410cda1eef5011$export$159051b21d796f59.tagName
        ];
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, $01410cda1eef5011$export$126b026a4280c589.tagName);
        this.index = new Map();
    }
    /**
     * @returns The T.
     */ getT() {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the T.
     * @param T The T.
     */ setT(T) {
        let i = this.index.get(T.tagName);
        if (i != undefined) this.nodes.set(i, T);
        else {
            this.nodes.set(this.nodes.size, T);
            this.index.set(T.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Qtot.
     */ getQtot() {
        let i = this.index.get($01410cda1eef5011$export$656e8af5996be26.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Qtot.
     * @param Qtot The Qtot.
     */ setQtot(Qtot) {
        let i = this.index.get(Qtot.tagName);
        if (i != undefined) this.nodes.set(i, Qtot);
        else {
            this.nodes.set(this.nodes.size, Qtot);
            this.index.set(Qtot.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumc.
     */ getSumc() {
        let i = this.index.get($01410cda1eef5011$export$c8de58561fc3a710.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Sumc.
     * @param Sumc The Sumc.
     */ setSumc(Sumc) {
        let i = this.index.get(Sumc.tagName);
        if (i != undefined) this.nodes.set(i, Sumc);
        else {
            this.nodes.set(this.nodes.size, Sumc);
            this.index.set(Sumc.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumg.
     */ getSumg() {
        let i = this.index.get($01410cda1eef5011$export$159051b21d796f59.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Sumg.
     * @param Sumg The Sumg.
     */ setSumg(Sumg) {
        let i = this.index.get(Sumg.tagName);
        if (i != undefined) this.nodes.set(i, Sumg);
        else {
            this.nodes.set(this.nodes.size, Sumg);
            this.index.set(Sumg.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states as a string array.
     */ toStringArray() {
        return [
            this.getT().value.toString(),
            this.getQtot().value.toString(),
            this.getSumc().value.toString(),
            this.getSumg().value.toString()
        ];
    }
}
class $01410cda1eef5011$export$dcce836c71a83df extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:densityOfStatesList";
    }
    /**
     * @param attributes The attributes.
     * @param description The description.
     * @param densityOfStates The densityOfStates.
     */ constructor(attributes, description, densityOfStates){
        super(attributes, $01410cda1eef5011$export$dcce836c71a83df.tagName);
        this.index = new Map();
        this.dosIndex = new Map();
        if (description) {
            this.nodes.set(this.nodes.size, description);
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size - 1);
        }
        if (densityOfStates) {
            let i = 0;
            densityOfStates.forEach((dos)=>{
                this.dosIndex.set(i, this.nodes.size);
                this.nodes.set(this.nodes.size, dos);
                i++;
            });
        }
    }
    /**
     * @returns The description.
     */ getDescription() {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the description.
     * @param description The description.
     */ setDescription(description) {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
        if (i != undefined) this.nodes.set(i, description);
        else {
            this.nodes.set(this.nodes.size, description);
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states at the given index.
     */ getDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) return this.nodes.get(j);
    }
    /**
     * Set the density of states at the given index.
     * @param i The index.
     * @param dos The density of states.
     */ setDensityOfStates(i, dos) {
        let j = this.dosIndex.get(i);
        if (j != undefined) this.nodes.set(j, dos);
        else {
            this.nodes.set(this.nodes.size, dos);
            this.dosIndex.set(i, this.nodes.size - 1);
        }
    }
    /**
     * Add the density of states.
     * @param dos The density of states.
     * @returns The index of the density of states added.
     */ addDensityOfStates(dos) {
        this.nodes.set(this.nodes.size, dos);
        let i = this.nodes.size - 1;
        this.dosIndex.set(i, this.nodes.size - 1);
        return i;
    }
    /**
     * Remove the density of states at the given index.
     * @param i The index.
     */ removeDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) this.nodes.delete(j);
    }
    /**
     * @returns The density of states list as a CSV string.
     */ toCSV() {
        let csv = "";
        let header = $01410cda1eef5011$export$126b026a4280c589.header;
        csv += header.join(",") + "\n";
        this.nodes.forEach((dos)=>{
            csv += dos.toStringArray().join(",") + "\n";
        });
        return csv;
    }
}
class $01410cda1eef5011$export$3da9759ad07746a3 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    static{
        /**
     * The key for the id attribute value.
     */ this.s_id = "id";
    }
    static{
        /**
     * The key for the description attribute value.
     */ this.s_description = "description";
    }
    static{
        /**
     * The key for the active attribute value.
     */ this.s_active = "active";
    }
    /**
     * Create a molecule.
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param id The molecule ID which is to be unique.
     * @param metadataList The metadata list.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethods The extra DOSC methods for calculating density of states.
     * @param reservoirSize The reservoir size.
     * @param tt The thermo table.
     */ constructor(attributes, id, metadataList, atoms, bonds, properties, energyTransferModel, dOSCMethod, distributionCalcMethod, extraDOSCMethods, reservoirSize, tt){
        super(attributes, $01410cda1eef5011$export$3da9759ad07746a3.tagName);
        this.label = this.getID();
        this.index = new Map();
        this.edmindex = new Map();
        this.id = id;
        let i = 0;
        // MetadataList
        if (metadataList) {
            this.nodes.set(i, metadataList);
            this.index.set((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, i);
            i++;
        }
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            this.index.set($01410cda1eef5011$export$9cea715eceba39a0.tagName, i);
            i++;
        }
        // Bonds
        if (bonds) {
            this.nodes.set(i, bonds);
            this.index.set($01410cda1eef5011$export$746fba2e30d93fe6.tagName, i);
            i++;
        }
        // Properties
        if (properties) {
            this.nodes.set(i, properties);
            this.index.set($01410cda1eef5011$export$4e0d1ad7ad6a0802.tagName, i);
            i++;
        }
        // EnergyTransferModel
        if (energyTransferModel) {
            this.nodes.set(i, energyTransferModel);
            this.index.set($01410cda1eef5011$export$499950da20810ac9.tagName, i);
            i++;
        }
        // DOSCMethod
        if (dOSCMethod) {
            this.nodes.set(i, dOSCMethod);
            this.index.set($01410cda1eef5011$export$bbdce6c921702068.tagName, i);
            i++;
        }
        // DistributionCalcMethod
        if (distributionCalcMethod) {
            this.nodes.set(i, distributionCalcMethod);
            this.index.set($01410cda1eef5011$export$3f9657e7f71262a.tagName, i);
            i++;
        }
        // ExtraDOSCMethod
        if (extraDOSCMethods) extraDOSCMethods.forEach((edm)=>{
            this.nodes.set(i, edm);
            this.edmindex.set(i, i);
            i++;
        });
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set($01410cda1eef5011$export$97850fe2f2906f00.tagName, i);
            i++;
        }
        if (tt) {
            this.nodes.set(i, tt);
            this.index.set($01410cda1eef5011$export$96f29f03cf201f97.tagName, i);
        }
    }
    /**
     * @returns The id of the molecule.
     */ getLabel() {
        //return this.getID() + " " + this.id.toString();
        return this.getID();
    }
    /**
     * @returns The id of the molecule.
     */ getID() {
        return this.attributes.get($01410cda1eef5011$export$3da9759ad07746a3.s_id);
    }
    /**
     * @param id The id of the molecule.
     */ setID(id) {
        this.attributes.set($01410cda1eef5011$export$3da9759ad07746a3.s_id, id);
    }
    /**
     * Get the description or the id of the molecule.
     * @returns The description of the molecule, or the id if it is not set.
     */ getDescription() {
        let description = this.attributes.get($01410cda1eef5011$export$3da9759ad07746a3.s_description);
        if (description != undefined) return description;
        return this.getID();
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */ setDescription(description) {
        this.attributes.set($01410cda1eef5011$export$3da9759ad07746a3.s_description, description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        let active = this.attributes.get($01410cda1eef5011$export$3da9759ad07746a3.s_active);
        if (active != undefined) {
            if (active == "true") return true;
            else return false;
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */ setActive(active) {
        this.attributes.set($01410cda1eef5011$export$3da9759ad07746a3.s_active, active.toString());
    }
    /**
     * @returns The metadata list of the molecule.
     */ getMetadataList() {
        let i = this.index.get((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the metadata list.
     * @param metadataList The metadata list.
     */ setMetadataList(metadataList) {
        let i = this.index.get((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        if (i == undefined) {
            this.index.set((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, this.nodes.size);
            this.addNode(metadataList);
        } else this.nodes.set(i, metadataList);
    }
    /**
     * @returns The properties of the molecule.
     */ getPropertyList() {
        let i = this.index.get($01410cda1eef5011$export$4e0d1ad7ad6a0802.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param properties The properties.
     */ setPropertyList(properties) {
        let i = this.index.get($01410cda1eef5011$export$4e0d1ad7ad6a0802.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$4e0d1ad7ad6a0802.tagName, this.nodes.size);
            this.addNode(properties);
        } else this.nodes.set(i, properties);
    }
    /**
     * Get a property.
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let pl = this.getPropertyList();
        if (pl != undefined) return pl.getProperty(dictRef);
    }
    /**
     * Set the property.
     * @param p The property.
     */ setProperty(p) {
        this.getPropertyList().setProperty(p);
    }
    /**
     * @param atomId The id of the atom.
     * @returns The atom for the given atomId.
     */ getAtom(atomId) {
        return this.getAtoms().getAtom(atomId);
    }
    /**
     * @returns The atoms of the molecule.
     */ getAtoms() {
        let i = this.index.get($01410cda1eef5011$export$9cea715eceba39a0.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param atoms The atoms.
     */ setAtoms(atoms) {
        this.index.set($01410cda1eef5011$export$9cea715eceba39a0.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, atoms);
    }
    /**
     * @param bondId The id of the bond.
     * @returns The bond for the given bondId.
     */ getBond(bondId) {
        return this.getBonds().getBond(bondId);
    }
    /**
     * @returns The bonds of the molecule.
     */ getBonds() {
        let i = this.index.get($01410cda1eef5011$export$746fba2e30d93fe6.tagName);
        return this.nodes.get(i);
    }
    /**
     * @param bonds The bonds.
     */ setBonds(bonds) {
        this.index.set($01410cda1eef5011$export$746fba2e30d93fe6.tagName, this.nodes.size);
        this.nodes.set(this.nodes.size, bonds);
    }
    /**
     * @returns The energy transfer model of the molecule.
     */ getEnergyTransferModel() {
        let i = this.index.get($01410cda1eef5011$export$499950da20810ac9.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the energy transfer model.
     * @param energyTransferModel The energy transfer model.
     */ setEnergyTransferModel(energyTransferModel) {
        let i = this.index.get($01410cda1eef5011$export$499950da20810ac9.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$499950da20810ac9.tagName, this.nodes.size);
            this.addNode(energyTransferModel);
        } else this.nodes.set(i, energyTransferModel);
    }
    /**
     * @returns The DOSC method of the molecule.
     */ getDOSCMethod() {
        let i = this.index.get($01410cda1eef5011$export$bbdce6c921702068.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the DOSC method.
     * @param dOSCMethod The DOSC method.
     */ setDOSCMethod(dOSCMethod) {
        let i = this.index.get($01410cda1eef5011$export$bbdce6c921702068.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$bbdce6c921702068.tagName, this.nodes.size);
            this.addNode(dOSCMethod);
        } else this.nodes.set(i, dOSCMethod);
    }
    /**
     * @returns The distribution calculation method of the molecule.
     */ getDistributionCalcMethod() {
        let i = this.index.get($01410cda1eef5011$export$3f9657e7f71262a.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the distribution calculation method.
     * @param distributionCalcMethod The distribution calculation method.
     */ setDistributionCalcMethod(distributionCalcMethod) {
        let i = this.index.get($01410cda1eef5011$export$3f9657e7f71262a.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$3f9657e7f71262a.tagName, this.nodes.size);
            this.addNode(distributionCalcMethod);
        } else this.nodes.set(i, distributionCalcMethod);
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */ getExtraDOSCMethod(index) {
        let i = this.edmindex.get(index);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */ setExtraDOSCMethod(index, extraDOSCMethod) {
        let i = this.edmindex.get(index);
        if (i == undefined) {
            this.edmindex.set(index, this.nodes.size);
            this.nodes.set(this.nodes.size, extraDOSCMethod);
        } else this.nodes.set(i, extraDOSCMethod);
    }
    /**
     * @returns The reservoir size of the molecule.
     */ getReservoirSize() {
        let i = this.index.get($01410cda1eef5011$export$97850fe2f2906f00.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the reservoir size.
     * @param reservoirSize The reservoir size.
     */ setReservoirSize(reservoirSize) {
        let i = this.index.get($01410cda1eef5011$export$97850fe2f2906f00.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$97850fe2f2906f00.tagName, this.nodes.size);
            this.addNode(reservoirSize);
        } else this.nodes.set(i, reservoirSize);
    }
    /**
     * @returns The density of states list of the molecule.
     */ getDensityOfStatesList() {
        let i = this.index.get($01410cda1eef5011$export$dcce836c71a83df.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the density of states list.
     * @param densityOfStatesList The density of states list.
     */ setDensityOfStatesList(densityOfStatesList) {
        let i = this.index.get($01410cda1eef5011$export$dcce836c71a83df.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$dcce836c71a83df.tagName, this.nodes.size);
            this.addNode(densityOfStatesList);
        } else this.nodes.set(i, densityOfStatesList);
    }
    /**
     * @returns The thermo table of the molecule.
     */ getThermoTable() {
        let i = this.index.get($01410cda1eef5011$export$96f29f03cf201f97.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the thermo table.
     * @param tt The thermo table.
     */ setThermoTable(tt) {
        let i = this.index.get($01410cda1eef5011$export$96f29f03cf201f97.tagName);
        if (i == undefined) {
            this.index.set($01410cda1eef5011$export$96f29f03cf201f97.tagName, this.nodes.size);
            this.addNode(tt);
        } else this.nodes.set(i, tt);
    }
    /**
     * Get the ZPE value of the molecule.
     */ getEnergy() {
        let p;
        // Successively try different energy definitions.
        try {
            p = this.getProperty($01410cda1eef5011$export$95174cf0748f45cd.dictRef);
        } catch (e) {
            try {
                p = this.getProperty($01410cda1eef5011$export$90bccbae54bb6d4f.dictRef);
            } catch (e) {
                try {
                    p = this.getProperty($01410cda1eef5011$export$e7df60530792b964.dictRef);
                } catch (e) {
                    try {
                        p = this.getProperty($01410cda1eef5011$export$a4fe62a56eafa45d.dictRef);
                    } catch (e) {
                        p = undefined;
                    }
                }
            }
        }
        if (p == undefined) return (0, $a227f0f1258db640$exports.Big)(0);
        else return p.getProperty().value;
    }
}









class $991aea17c2d860ae$export$7587e661a05e5158 {
    /**
     * @param defaults The defaults.
     */ constructor(){}
    /**
     * @returns 
     */ readFile() {
        return new Promise((resolve, reject)=>{
            let input = document.createElement("input");
            input.type = "file";
            let self = this;
            input.onchange = function() {
                if (input.files) {
                    let file = input.files[0];
                    let inputFilename = file.name;
                    let reader = new FileReader();
                    let chunkSize = 1048576; // 1MB
                    let start = 0;
                    let contents = "";
                    reader.onload = function(e) {
                        if (e.target == null) {
                            reject(new Error("Event target is null"));
                            return;
                        }
                        contents += e.target.result;
                        if (file != null) {
                            if (start < file.size) {
                                // Read the next chunk
                                let blob = file.slice(start, start + chunkSize);
                                reader.readAsText(blob);
                                start += chunkSize;
                            } else {
                                // All chunks have been read
                                contents = contents.trim();
                                let parser = new DOMParser();
                                let xml = parser.parseFromString(contents, "text/xml");
                                resolve(self.parse(xml));
                            }
                        }
                    };
                    // Read the first chunk
                    let blob = file.slice(start, start + chunkSize);
                    reader.readAsText(blob);
                    start += chunkSize;
                }
            };
            input.click();
        });
    }
    /**
     * Parse the XML.
     */ parse(xml) {
        /**
         * The molecules.
         */ let molecules = new Map();
        // Get the XML "moleculeList" element.
        let xml_ml = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName);
        // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
        let mlTagNames = new Set();
        xml_ml.childNodes.forEach(function(node) {
            mlTagNames.add(node.nodeName);
        });
        /*
        if (mlTagNames.size != 1) {
            if (!(mlTagNames.size >= 2 && mlTagNames.has("#text")) ||
                !(mlTagNames.size == 3 && mlTagNames.has('#comment'))) {
                console.error("moleculeListTagNames:");
                mlTagNames.forEach(x => console.error(x));
                //throw new Error("Additional tag names in moleculeList:");
            }
        }
        if (!mlTagNames.has(Molecule.tagName)) {
            throw new Error("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none!");
        }
        */ // Process the XML "molecule" elements.
        let xml_ms = xml_ml.getElementsByTagName((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
        let xml_msl = xml_ms.length;
        console.log("Number of molecules=" + xml_msl);
        let naliases = 0;
        //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for(let i = 0; i < xml_msl; i++){
            // console.log("i=" + i);
            // Create a new Molecule.
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ms[i]);
            let mID = attributes.get((0, $01410cda1eef5011$export$3da9759ad07746a3).s_id);
            //console.log("mID=" + mID);
            if (mID == undefined) throw new Error((0, $01410cda1eef5011$export$3da9759ad07746a3).s_id + " is undefined");
            let cns = xml_ms[i].childNodes;
            //console.log("cns.length=" + cns.length);
            // Check if there are any child elements. If not, then this molecule is an alias.
            if (cns.length == 0) {
                naliases++;
                //console.log("This molecule is an alias.");
                let ref = attributes.get("ref");
                if (ref == undefined) throw new Error("ref is undefined");
                continue;
            }
            let id = molecules.size;
            let m = new (0, $01410cda1eef5011$export$3da9759ad07746a3)(attributes, id);
            molecules.set(id, m);
            // Create a set of molecule tag names.
            let moleculeTagNames = new Set();
            //cns.forEach(function (cn) {
            for(let j = 0; j < cns.length; j++){
                let cn = cns[j];
                // Check for nodeName repeats that are not #text.
                if (!moleculeTagNames.has(cn.nodeName)) moleculeTagNames.add(cn.nodeName);
                else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
            //console.log(cn.nodeName);
            }
            // Init metadataList.
            //console.log("Init metadataList.");
            let xml_mls = xml_ms[i].getElementsByTagName((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
            if (xml_mls.length > 0) {
                if (xml_mls.length > 1) throw new Error("Expecting 1 or 0 " + (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName + " but finding " + xml_mls.length + "!");
                let ml = new (0, $97ed023cfe5af5b8$export$3e18a603070a78a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mls[0]));
                m.setMetadataList(ml);
                let xml_ms = xml_mls[0].getElementsByTagName((0, $97ed023cfe5af5b8$export$e7adebdc1ebd2fed).tagName);
                for(let j = 0; j < xml_ms.length; j++){
                    // Create a new Metadata.
                    let md = new (0, $97ed023cfe5af5b8$export$e7adebdc1ebd2fed)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ms[j]));
                    ml.addMetadata(md);
                }
                moleculeTagNames.delete((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
            }
            // Init atoms.
            //console.log("Init atoms.");
            // There can be an individual atom not in an atom array, or an atom array.
            let xml_aas = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
            if (xml_aas.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName + " but finding " + xml_aas.length + "!");
            if (xml_aas.length == 1) {
                let xml_aa = xml_aas[0];
                let xml_as = xml_aa.getElementsByTagName((0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName);
                if (xml_as.length == 0) throw new Error("Expecting 1 or more atoms in " + (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName + ", but finding 0!");
                let aa = new (0, $01410cda1eef5011$export$9cea715eceba39a0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_aa));
                m.setAtoms(aa);
                for(let j = 0; j < xml_as.length; j++)aa.addAtom(new (0, $01410cda1eef5011$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_as[j]), m));
                moleculeTagNames.delete((0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
            } else {
                let xml_as = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName);
                if (xml_as.length == 1) {
                    let aa = new (0, $01410cda1eef5011$export$9cea715eceba39a0)(new Map());
                    aa.addAtom(new (0, $01410cda1eef5011$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_as[0]), m));
                    m.setAtoms(aa);
                } else if (xml_as.length > 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName + " but finding " + xml_as.length + ". Should these be in an " + (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName + "?");
            }
            //console.log("atomsNode=" + atomsNode);
            moleculeTagNames.delete((0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName);
            // Init bonds.
            // There can be an individual bond not in a bond array, or a bond array.
            // There may be only 1 bond in a BondArray.
            let xml_bas = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
            if (xml_bas.length > 0) {
                if (xml_bas.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName + " but finding " + xml_bas.length + "!");
                let xml_bs = xml_bas[0].getElementsByTagName((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
                let ba = new (0, $01410cda1eef5011$export$746fba2e30d93fe6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bas[0]));
                for(let j = 0; j < xml_bs.length; j++)ba.addBond(new (0, $01410cda1eef5011$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bs[j]), m));
                m.setBonds(ba);
                moleculeTagNames.delete((0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
            } else {
                let xml_bonds = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
                if (xml_bonds.length > 0) {
                    if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$153327fc99ac0c53).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName + "?");
                    let ba = new (0, $01410cda1eef5011$export$746fba2e30d93fe6)(new Map());
                    ba.addBond(new (0, $01410cda1eef5011$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bonds[0]), m));
                    m.setBonds(ba);
                }
            }
            moleculeTagNames.delete((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
            // Organise PropertyList or individual Property.
            // (There can be an individual property not in a propertyList?)
            // If there is a PropertyList, then create a property list.
            let xml_pls = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
            if (xml_pls.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName + " but finding " + xml_pls.length + "!");
            if (xml_pls.length == 1) {
                // Create a new PropertyList.
                let pl = new (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pls[0]));
                m.setPropertyList(pl);
                let xml_ps = xml_pls[0].getElementsByTagName((0, $01410cda1eef5011$export$41b04b3a73e7216d).tagName);
                for(let j = 0; j < xml_ps.length; j++)// Create a new Property.
                pl.setProperty(new (0, $01410cda1eef5011$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ps[j])));
                moleculeTagNames.delete((0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
            } else {
                // There is a Property on its own. For simplicity, this will be stored in a PropertyList.
                // Create a new PropertyList.
                let pl = new (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802)(new Map());
                m.setPropertyList(pl);
                let xml_ps = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$41b04b3a73e7216d).tagName);
                if (xml_ps.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$41b04b3a73e7216d).tagName + " but finding " + xml_ps.length + ". Should these be in a " + (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName + "?");
                // Create a new Property.
                pl.setProperty(new (0, $01410cda1eef5011$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ps[0])));
                moleculeTagNames.delete((0, $01410cda1eef5011$export$41b04b3a73e7216d).tagName);
            }
            // Organise EnergyTransferModel.
            let xml_etms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$499950da20810ac9).tagName);
            if (xml_etms.length > 0) {
                if (xml_etms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$499950da20810ac9).tagName + " but finding " + xml_etms.length + "!");
                let etm = new (0, $01410cda1eef5011$export$499950da20810ac9)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_etms[0]));
                m.setEnergyTransferModel(etm);
                moleculeTagNames.delete((0, $01410cda1eef5011$export$499950da20810ac9).tagName);
            }
            // Organise DOSCMethod.
            let xml_dms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$bbdce6c921702068).tagName);
            if (xml_dms.length > 0) {
                if (xml_dms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$bbdce6c921702068).tagName + " but finding " + xml_dms.length + "!");
                let doscm = new (0, $01410cda1eef5011$export$bbdce6c921702068)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dms[0]));
                m.setDOSCMethod(doscm);
                moleculeTagNames.delete((0, $01410cda1eef5011$export$bbdce6c921702068).tagName);
            }
            // Organise DistributionCalcMethod. (Output only)
            let xml_dcms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$3f9657e7f71262a).tagName);
            if (xml_dcms.length > 0) {
                if (xml_dcms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$3f9657e7f71262a).tagName + " but finding " + xml_dcms.length + "!");
                let dcmAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dcms[0]);
                let dcm = new (0, $01410cda1eef5011$export$3f9657e7f71262a)(dcmAttributes);
                m.setDistributionCalcMethod(dcm);
                moleculeTagNames.delete((0, $01410cda1eef5011$export$3f9657e7f71262a).tagName);
            }
            // Organise DensityOfStatesList. (Output only)
            let xml_dosl = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$dcce836c71a83df).tagName);
            if (xml_dosl.length > 0) {
                if (xml_dosl.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$dcce836c71a83df).tagName + " but finding " + xml_dosl.length + "!");
                let dosl = new (0, $01410cda1eef5011$export$dcce836c71a83df)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dosl[0]));
                m.setDensityOfStatesList(dosl);
                let xml_dos = xml_dosl[0].getElementsByTagName((0, $01410cda1eef5011$export$126b026a4280c589).tagName);
                // Organise Description.
                let xml_ds = xml_dosl[0].getElementsByTagName((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
                if (xml_ds.length > 0) {
                    if (xml_ds.length > 1) throw new Error("Expecting 1 or 0 " + (0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName + " but finding " + xml_ds.length + "!");
                    let ds = new (0, $69ecbdaa96f3962d$export$393edc798c47379d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ds[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ds[0])));
                    dosl.setDescription(ds);
                }
                // Organise DensityOfStates.
                //console.log("xml_dos.length=" + xml_dos.length);
                if (xml_dos.length == 0) throw new Error("Expecting 1 or more " + (0, $01410cda1eef5011$export$126b026a4280c589).tagName + " but finding 0!");
                else for(let j = 0; j < xml_dos.length; j++){
                    //console.log("j=" + j);
                    let dos = new (0, $01410cda1eef5011$export$126b026a4280c589)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
                    if (xml_t.length != 1) throw new Error("Expecting 1 " + (0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName + " but finding " + xml_t.length + "!");
                    else {
                        let t = new (0, $69ecbdaa96f3962d$export$971d5caa766a69d7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_t[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_t[0]))));
                        dos.setT(t);
                    //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$656e8af5996be26).tagName);
                    if (xml_qtot.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$656e8af5996be26).tagName + " but finding " + xml_qtot.length + "!");
                    else {
                        let qtot = new (0, $01410cda1eef5011$export$656e8af5996be26)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_qtot[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                    //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$c8de58561fc3a710).tagName);
                    if (xml_sumc.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$c8de58561fc3a710).tagName + " but finding " + xml_sumc.length + "!");
                    else {
                        let sumc = new (0, $01410cda1eef5011$export$c8de58561fc3a710)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_sumc[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                    //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$159051b21d796f59).tagName);
                    if (xml_sumg.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$159051b21d796f59).tagName + " but finding " + xml_sumg.length + "!");
                    else {
                        let sumg = new (0, $01410cda1eef5011$export$159051b21d796f59)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_sumg[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                    //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                }
                moleculeTagNames.delete((0, $01410cda1eef5011$export$dcce836c71a83df).tagName);
            }
            // Check for unexpected tags.
            moleculeTagNames.delete("#text");
            if (moleculeTagNames.size > 0) {
                console.warn("There are additional unexpected moleculeTagNames:");
                moleculeTagNames.forEach((x)=>console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
            }
        }
        console.log("Number of molecules=" + molecules.size);
        console.log("Number of alias molecules=" + naliases.toString());
        return molecules;
    }
}


let $0ed86fc7e748b547$var$mk_url = "https://github.com/MESMER-kinetics";
/**
 * MXG.
 */ let $0ed86fc7e748b547$var$mxg_url = $0ed86fc7e748b547$var$mk_url + "/mxg";
let $0ed86fc7e748b547$var$mxg_a = document.createElement("a");
$0ed86fc7e748b547$var$mxg_a.href = $0ed86fc7e748b547$var$mxg_url;
$0ed86fc7e748b547$var$mxg_a.textContent = $0ed86fc7e748b547$var$mxg_url;
/**
 * Example data.
 */ let $0ed86fc7e748b547$var$mxgDataExamples_url = $0ed86fc7e748b547$var$mxg_url + "/tree/main/data/examples";
let $0ed86fc7e748b547$var$mxgDataExamples_a = document.createElement("a");
$0ed86fc7e748b547$var$mxgDataExamples_a.href = $0ed86fc7e748b547$var$mxgDataExamples_url;
$0ed86fc7e748b547$var$mxgDataExamples_a.textContent = $0ed86fc7e748b547$var$mxgDataExamples_url;
/**
 * MESMER.
 */ let $0ed86fc7e748b547$var$mesmer_url = $0ed86fc7e748b547$var$mk_url + "/MESMER-code";
let $0ed86fc7e748b547$var$mesmer_a = document.createElement("a");
$0ed86fc7e748b547$var$mesmer_a.href = $0ed86fc7e748b547$var$mesmer_url;
$0ed86fc7e748b547$var$mesmer_a.textContent = $0ed86fc7e748b547$var$mesmer_url;
/**
 * EPSRC.
 */ let $0ed86fc7e748b547$var$epsrc_url = "https://epsrc.ukri.org/";
let $0ed86fc7e748b547$var$epsrc_a = document.createElement("a");
$0ed86fc7e748b547$var$epsrc_a.href = $0ed86fc7e748b547$var$epsrc_url;
$0ed86fc7e748b547$var$epsrc_a.textContent = "The UK Engineering and Physical Sciences Research Council (EPSRC)";
/**
 * University of Leeds
 */ let $0ed86fc7e748b547$var$uol_url = "https://www.leeds.ac.uk/";
let $0ed86fc7e748b547$var$uol_a = document.createElement("a");
$0ed86fc7e748b547$var$uol_a.href = $0ed86fc7e748b547$var$uol_url;
$0ed86fc7e748b547$var$uol_a.textContent = "The University of Leeds";
/**
 * 3DMol.
 */ let $0ed86fc7e748b547$var$t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let $0ed86fc7e748b547$var$t3Dmol_a = document.createElement("a");
$0ed86fc7e748b547$var$t3Dmol_a.href = $0ed86fc7e748b547$var$t3Dmol_url;
$0ed86fc7e748b547$var$t3Dmol_a.textContent = $0ed86fc7e748b547$var$t3Dmol_url;
let $0ed86fc7e748b547$var$t3Dmol_citation_url = "http://doi.org/10.1093/bioinformatics/btu829";
let $0ed86fc7e748b547$var$t3Dmol_citation_a = document.createElement("a");
$0ed86fc7e748b547$var$t3Dmol_citation_a.href = $0ed86fc7e748b547$var$t3Dmol_citation_url;
$0ed86fc7e748b547$var$t3Dmol_citation_a.textContent = "doi:10.1093/bioinformatics/btu829";
/**
 * Big.js.
 */ let $0ed86fc7e748b547$var$bigjs_url = "https://mikemcl.github.io/big.js/";
let $0ed86fc7e748b547$var$bigjs_a = document.createElement("a");
$0ed86fc7e748b547$var$bigjs_a.href = $0ed86fc7e748b547$var$bigjs_url;
$0ed86fc7e748b547$var$bigjs_a.textContent = $0ed86fc7e748b547$var$bigjs_url;
/**
 * Get a div with details about MXG.
 */ function $0ed86fc7e748b547$var$about(w) {
    if (w == null) return;
    w.document.title = "About MXG";
    // Welcome Text.
    let wDiv = document.createElement("div");
    w.document.body.appendChild(wDiv);
    // p1.
    let p1 = w.document.createElement("p");
    wDiv.appendChild(p1);
    p1.appendChild(w.document.createTextNode("MXG is a free and open source program to assist in creating, editing and         visualising MESMER XML data. The MXG development repository is: "));
    p1.appendChild($0ed86fc7e748b547$var$mxg_a);
    p1.appendChild(w.document.createTextNode(". Details of MESMER - the Master Equation Solver for Multi Energy-well Reactions         can be found at: "));
    p1.appendChild($0ed86fc7e748b547$var$mesmer_a);
    p1.appendChild(w.document.createTextNode("."));
    // p2.
    let p2 = document.createElement("p");
    wDiv.appendChild(p2);
    p2.appendChild(w.document.createTextNode("MXG is being developed by a team based at "));
    p2.appendChild($0ed86fc7e748b547$var$uol_a);
    p2.appendChild(w.document.createTextNode(" funded by "));
    p2.appendChild($0ed86fc7e748b547$var$epsrc_a);
    p2.appendChild(w.document.createTextNode("Like MESMER, MXG development aims to be driven in part by users reporting issues,         submitting feature requests, and getting involved in development."));
    // p3.
    let p3 = w.document.createElement("p");
    wDiv.appendChild(p3);
    p3.appendChild(w.document.createTextNode("MXG runs on the latest Firefox, Chrome, Edge or Safari Web browsers. It can         be used offline if installed as a Progressive Web App (PWA). PWA installation varies by Web browser and device, it         should only require user permission and is effectively a form of Web browser bookmark. For guidance please see the         MXG main development repository README: "));
    p3.appendChild($0ed86fc7e748b547$var$mxg_a.cloneNode(true));
    p3.appendChild(w.document.createTextNode(". MXG may work on small screen devices, but it is recommended to use a device         with at least a standard laptop sized screen."));
    // p4.
    let p4 = document.createElement("p");
    wDiv.appendChild(p4);
    p4.appendChild(w.document.createTextNode('The Menu contains 5 buttons. The Load MESMER File button is for loading a         MESMER XML data file with a "me:mesmer" tag containing: "me:title", "moleculeList", "reactionList",         "me:conditions", "me:modelParameters", and "me:control" tags containing further details. A MESMER XML output         data file will also have "me:metadataList" and "me:analysis" tags as children of the "me:mesmer" tag. Additional         output is located in "moleculeList" and "reactionList" tags. The Load Molecules button is for loading molecule         data for selection, modification and for inclusion in saved MESMER files. The Load Defaults button is to load         default values. Whilst not necessary, loading defaults is for convenience, as often similar values and the same         units as defaults are wanted for specified variables. The Save MESMER File button is for saving a new MESMER XML         data file. The file should be saved to the Web browser downloads location. It should contain no comments or extra         white space between XML tags with the exception of new lines, tag values should be trimmed of white space,         numbers should be output in a particular format (decimals - where numbers with more than 8 digits are output in         scientific notation format). There should be: a single "atomArray" tag containing all "atom" tags (each atom         should have a unique id attribute); a single "bondArray" tag containing any "bond" tags (each bond should have a         unique id attribute); and, a single "propertyList" tag containing all "property" tags for each "molecule" tag in         the "moleculeList". The saved file should reflect what is specified via the interface.'));
    /* Between the Load and Save \
    buttons are buttons to increase or decrease the fontsize and to change between a light and dark theme. In \
    addition to increasing or decreasing the fontsize of text elements, the fontsize buttons can be actioned to \
    redraw the reaction diagram and any species plots with a larger or smaller fontsize respectively.'));*/ // p5.
    let p5 = w.document.createElement("p");
    wDiv.appendChild(p5);
    p5.appendChild(w.document.createTextNode('The "me:title" value is presented in an input alongside an associated label.         The input can be used to change the value which is also used to compose filenames for files saved from MXG.         Details are presented via buttons which contain a triangular symbol. A triangle orientated with a point down: ' + (0, $f0396edd0a5c99f7$export$38aa1ab9c2935930) + " can be actioned to show more details (if there are any). A triangle orientated with a point         up: " + (0, $f0396edd0a5c99f7$export$e5e81646ee331a9e) + " can be actioned to hide those details again."));
    // p6.
    let p6 = w.document.createElement("p");
    wDiv.appendChild(p6);
    p6.textContent = 'The Reaction Diagram button shows/hides a reaction well diagram which is redrawn if molecule "me:ZPE"         property values are changed. The diagram can be opened in a new Window and saved to a PNG format file.';
    // p7.
    let p7 = w.document.createElement("p");
    wDiv.appendChild(p7);
    p7.textContent = "MXG uses 3DMol.js under a BSD-3-Clause licence to visualise molecules with coordinates. For details         of 3DMol.js please see the GitHub repository: ";
    p7.appendChild($0ed86fc7e748b547$var$t3Dmol_a);
    p7.appendChild(w.document.createTextNode(". If you use the 3DMol.js visualisations, please cite: Nicholas Rego and         David Koes 3Dmol.js: molecular visualization with WebGL Bioinformatics (2015) 31 (8): 1322-1324 "));
    p7.appendChild($0ed86fc7e748b547$var$t3Dmol_citation_a);
    p7.appendChild(w.document.createTextNode("."));
    // p8.
    let p8 = w.document.createElement("p");
    wDiv.appendChild(p8);
    p8.textContent = "MXG uses Big.js under an MIT licence to handle numbers. For details of Big.js please see the GitHub         repository: ";
    p8.appendChild($0ed86fc7e748b547$var$bigjs_a);
    p8.appendChild(w.document.createTextNode("."));
}
function $0ed86fc7e748b547$export$c9a19c59161f09a0() {
    // Create Menu.
    let menuDiv = document.getElementById((0, $7e68913db756e51f$export$32f4a893b4a151db));
    menuDiv.style.display = "flex";
    menuDiv.style.justifyContent = "center";
    menuDiv.style.margin = "5px";
    menuDiv.style.padding = "5px";
    menuDiv.style.border = "1px solid black";
    menuDiv.style.backgroundColor = "lightgrey";
    // Add About MXG button.
    let s_About = "About";
    let ab = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_About, (0, $7e68913db756e51f$export$39722580448f5a99)(s_About), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    menuDiv.appendChild(ab);
    ab.addEventListener("click", async (event)=>{
        let aw = window.open("", "", "width=600,height=400");
        $0ed86fc7e748b547$var$about(aw);
    });
    // Add Load Molecules button.
    let s_Load_Molecules = "Load Molecules";
    let lmb = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Load_Molecules, (0, $7e68913db756e51f$export$39722580448f5a99)(s_Load_Molecules), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    menuDiv.appendChild(lmb);
    let lm = new (0, $991aea17c2d860ae$export$7587e661a05e5158)();
    lmb.addEventListener("click", async (event)=>{
        let ms = await lm.readFile();
        // Add the molecules to the libmols map.
        ms.forEach((v, k)=>{
            (0, $7e68913db756e51f$export$ac55d333e780178c)(v, (0, $7e68913db756e51f$export$7c97c73a2c729cf9));
        });
    });
    // Add Load Defaults button.
    let s_Load_Defaults = "Load Defaults";
    let ldb = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Load_Defaults, (0, $7e68913db756e51f$export$39722580448f5a99)(s_Load_Defaults), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    ldb.addEventListener("click", (event)=>{
        (0, $7e68913db756e51f$export$ebe90cb607ad99e).readFile();
    });
    menuDiv.appendChild(ldb);
    // Add Load MESMER File button.
    let s_Load = "Load MESMER File";
    let lb = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Load, (0, $7e68913db756e51f$export$39722580448f5a99)(s_Load), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    lb.addEventListener("click", (event)=>{
        (0, $7e68913db756e51f$export$11e63f7b0f3d9900)();
    });
    menuDiv.appendChild(lb);
    /* Add style/theme option buttons.
    // Add Increase Fontsize button.
    let s_Increase_Fontsize: string = 'Increase Fontsize';
    let increaseFontSizeButton = createButton(s_Increase_Fontsize, addID(s_Increase_Fontsize), boundary1);
    increaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize + 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(increaseFontSizeButton);
    // Add Decrease Fontsize button.
    let s_Decrease_Fontsize: string = 'Decrease Fontsize';
    let decreaseFontSizeButton = createButton(s_Decrease_Fontsize, addID(s_Decrease_Fontsize), boundary1);
    decreaseFontSizeButton.addEventListener('click', () => {
        let fontSize = parseInt(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize - 1) + 'px';
        if (rdWindow != null) {
            //let fontSize = parseInt(getComputedStyle(popWindow.document.body).fontSize);
            rdWindow.document.body.style.fontSize = (fontSize - 1) + 'px';
        }
        redrawReactionsDiagram();
        redrawScatterPlots();
    });
    menuDiv.appendChild(decreaseFontSizeButton);
    // Add Light/Dark Mode button.
    let s_Light_Dark_Mode = 'Light/Dark Mode';
    let lightDarkModeButton = createButton(s_Light_Dark_Mode, addID(s_Light_Dark_Mode), boundary1);
    lightDarkModeButton.addEventListener('click', () => {
        dark = !dark;
        //localStorage.setItem('darkMode', dark ? 'true' : 'false');
        if (dark) {
            document.body.className = 'dark-mode';
        } else {
            document.body.className = 'light-mode';
        }
        redrawReactionsDiagram();
    });
    menuDiv.appendChild(lightDarkModeButton);
    */ // Add Save To MESMER File button.
    let s_Save_MESMER_File = "Save MESMER File";
    let saveButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_Save_MESMER_File, (0, $7e68913db756e51f$export$39722580448f5a99)(s_Save_MESMER_File), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    saveButton.addEventListener("click", (0, $7e68913db756e51f$export$cffb3d6135ce44ec));
    menuDiv.appendChild(saveButton);
    return menuDiv;
}












class $cccccb2a0a919d2e$export$79d0bd4671c1fc67 {
    /**
     * Construct a new M_Defaults object.
     */ constructor(){
        /**
     * TagName.
     */ this.tagName = "defaults";
        this.values = new Map();
        this.attributess = new Map();
    }
    /**
     * Read the defaults.xml file.
     */ readFile() {
        // Create a file input element to prompt the user to select the default.xml file.
        let input = document.createElement("input");
        input.type = "file";
        let self = this;
        input.onchange = function() {
            if (input.files) {
                for(let i = 0; i < input.files.length; i++)console.log("inputElement.files[" + i + "]=" + input.files[i]);
                let file = input.files[0];
                //console.log("file=" + file);
                console.log(file.name);
                let inputFilename = file.name;
                let reader = new FileReader();
                let chunkSize = 1048576; // 1MB
                let start = 0;
                let contents = "";
                reader.onload = function(e) {
                    if (e.target == null) throw new Error("Event target is null");
                    contents += e.target.result;
                    if (file != null) {
                        if (start < file.size) {
                            // Read the next chunk
                            let blob = file.slice(start, start + chunkSize);
                            reader.readAsText(blob);
                            start += chunkSize;
                        } else {
                            // All chunks have been read
                            contents = contents.trim();
                            //console.log('contents ' + contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            self.parse(xml);
                        }
                    }
                };
                // Read the first chunk
                let blob = file.slice(start, start + chunkSize);
                reader.readAsText(blob);
                start += chunkSize;
            }
        };
        input.click();
    }
    /**
     * Parses the xml loading data into attributess and values.
     * @param xml The XML document.
     */ parse(xml) {
        // Process the XML.
        let xml_defaults = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, this.tagName);
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_defaults);
        console.log("Default attributes: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(attributes));
        let children = xml_defaults.children;
        console.log("children.length=" + children.length);
        for(let i = 0; i < children.length; i++){
            let child = children[i];
            let tagName = child.tagName;
            console.log("tagName=" + tagName);
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(child);
            this.attributess.set(tagName, attributes);
            console.log("Attributes: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(attributes));
            if (tagName == "property") {
                let dictRef = child.getAttribute("dictRef");
                try {
                    let xml_scalar = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(child, "scalar");
                    let v = xml_scalar.innerHTML;
                    if (v != null) {
                        console.log("v=" + v);
                        this.values.set(dictRef, v);
                    } else console.log("v is null");
                } catch (e) {
                    console.log("Error: " + e);
                }
            } else {
                //let v: string | null = child.nodeValue;
                //let v: string | null = child.nodeName;
                let v = child.innerHTML;
                if (v != null) {
                    console.log("v=" + v);
                    this.values.set(tagName, v);
                } else console.log("v is null");
            }
        }
        // Some tests.
        console.log("values: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(this.values));
        this.attributess.forEach((value, key)=>{
            console.log("key=" + key + " value=" + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(value));
        });
    }
}











function $174b37a7f81f9b54$export$12aafb9570dfb660(mlDiv, molecules) {
    let addMoleculeButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener("click", ()=>{
        let mid = "Kr";
        let m = new (0, $01410cda1eef5011$export$3da9759ad07746a3)(new Map(), mid);
        mid = $174b37a7f81f9b54$var$setMoleculeID(mid, m, molecules);
        (0, $7e68913db756e51f$export$ac55d333e780178c)(m, molecules);
        m.setAtoms(new (0, $01410cda1eef5011$export$9cea715eceba39a0)(new Map()));
        m.setBonds(new (0, $01410cda1eef5011$export$746fba2e30d93fe6)(new Map()));
        let moleculeDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName, mid);
        let moleculeDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(moleculeDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let mcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mcDivID, mlDiv, addMoleculeButton, moleculeDiv, mid, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Add the molecule to the BathGas select elements.
        (0, $7e68913db756e51f$export$a30e0f90a7434924)((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, mid);
        // Add edit Name button.
        $174b37a7f81f9b54$var$addEditIDButton(m, mcDiv.querySelector((0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), moleculeDiv, (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Description
        moleculeDiv.appendChild($174b37a7f81f9b54$var$processDescription((0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $7e68913db756e51f$export$666359451816b0e7)), m.getDescription.bind(m), m.setDescription.bind(m), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
        let aaDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(aaDivID);
        let aacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aaDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let aacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(aacDivID, moleculeDiv, null, aaDiv, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        aaDiv.appendChild($174b37a7f81f9b54$var$getAddAtomButton(m, aaDiv, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
        let baDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(baDivID);
        let bacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(baDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let bacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(bacDivID, moleculeDiv, null, baDiv, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        baDiv.appendChild($174b37a7f81f9b54$var$getAddBondButton(m, baDiv, (0, $01410cda1eef5011$export$153327fc99ac0c53).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        $174b37a7f81f9b54$export$7aad7e61c4f49964(m, moleculeDiv, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Create collapsible Properties HTMLDivElement.
        let plDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
        let plDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(plDivID);
        let plcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(plDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let plcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(plcDivID, moleculeDiv, null, plDiv, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
    // Add code to add propertyArray...
    });
    return addMoleculeButton;
}
function $174b37a7f81f9b54$export$1f1b9bc888fe9f4c(mlDiv, mb, molecules) {
    let addFromLibraryButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$b071b08ccb05fd2), undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    mlDiv.appendChild(addFromLibraryButton);
    // Add event listener for the button.
    addFromLibraryButton.addEventListener("click", ()=>{
        // Create a select element to select a libraryMolecule.
        let selectDivID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName, "div");
        (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(selectDivID);
        let selectDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)((0, $7e68913db756e51f$export$bea69a603fae01a6)(selectDivID), (0, $7e68913db756e51f$export$39c84188a71202f7));
        let options = Array.from((0, $7e68913db756e51f$export$5ac38056c0103baa)((0, $7e68913db756e51f$export$7c97c73a2c729cf9)));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        (0, $7e68913db756e51f$export$10de1fc8385eec4a)(options, true);
        let selectID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(selectDivID, (0, $f0396edd0a5c99f7$export$8797b0c8298d191));
        (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(selectID);
        let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, "Select molecule", (0, $7e68913db756e51f$export$d8b8827abc8ab7e7), (0, $7e68913db756e51f$export$bea69a603fae01a6)(selectID), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        select.classList.add((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, mb);
        (0, $7e68913db756e51f$export$3b08dcba56872ec6)(options, select);
        select.addEventListener("change", (event)=>{
            let target = event.target;
            let selectedOption = target.options[target.selectedIndex];
            let label = selectedOption.value;
            let molecule = (0, $7e68913db756e51f$export$7577c09cb43cc206)(label, (0, $7e68913db756e51f$export$7c97c73a2c729cf9));
            let mid = molecule.getID();
            mid = $174b37a7f81f9b54$var$setMoleculeID(mid, molecule, molecules);
            molecules.set(mid, molecule);
            // Add molecule to the MoleculeList.
            let moleculeDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName, molecules.size);
            let moleculeDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(moleculeDivID);
            // Create collapsible Molecule HTMLDivElement.
            let mcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let mcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mcDivID, mlDiv, mb, moleculeDiv, molecule.getLabel(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Add the molecule to the BathGas select elements.
            (0, $7e68913db756e51f$export$a30e0f90a7434924)((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, molecule.getID());
            // Add edit Name button.
            $174b37a7f81f9b54$var$addEditIDButton(molecule, mcDiv.querySelector((0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), moleculeDiv, (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Description
            moleculeDiv.appendChild($174b37a7f81f9b54$var$processDescription((0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $7e68913db756e51f$export$666359451816b0e7)), molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
            let mlistDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mlistDivID, (0, $7e68913db756e51f$export$39c84188a71202f7));
            let mlistcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mlistDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let mlistcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mlistcDivID, moleculeDiv, null, mlistDiv, (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Add metadata.
            let metadataList = molecule.getMetadataList();
            if (metadataList != undefined) metadataList.getMetadata().forEach((md)=>{
                let mdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)();
                mlistDiv.appendChild(mdDiv);
                mdDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(md.getLabelText(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b)));
            });
            // Create collapsible AtomArray HTMLDivElement.
            let aaDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
            let aaDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(aaDivID);
            let aacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aaDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let aacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(aacDivID, moleculeDiv, null, aaDiv, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Add atoms.
            let aa = molecule.getAtoms();
            if (aa != undefined) aa.atoms.forEach((a)=>{
                aaDiv.appendChild($174b37a7f81f9b54$var$addAtom(molecule, aaDivID, molecule.getAtoms(), a, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            });
            aaDiv.appendChild($174b37a7f81f9b54$var$getAddAtomButton(molecule, aaDiv, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            // Create collapsible BondArray HTMLDivElement.
            let baDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
            let baDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(baDivID);
            let bacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(baDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let bacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(bacDivID, moleculeDiv, null, baDiv, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Add bonds.
            let ba = molecule.getBonds();
            if (ba != undefined) molecule.getBonds().bonds.forEach((b)=>{
                if (aa == undefined) throw new Error("Atoms are not defined for molecule " + molecule.getLabel());
                baDiv.appendChild($174b37a7f81f9b54$var$addBond(molecule, baDivID, aa.atoms, molecule.getBonds(), b, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            });
            baDiv.appendChild($174b37a7f81f9b54$var$getAddBondButton(molecule, baDiv, (0, $01410cda1eef5011$export$153327fc99ac0c53).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            $174b37a7f81f9b54$export$7aad7e61c4f49964(molecule, moleculeDiv, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Create collapsible Properties HTMLDivElement.
            let plDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDivID, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
            let plDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(plDivID);
            let plcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(plDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let plcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(plcDivID, moleculeDiv, null, plDiv, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Add code to add propertyArray...
            // Remove the select element.
            selectDiv.remove();
        });
    });
    return addFromLibraryButton;
}
/**
 * For setting the molecule ID.
 * 
 * @param mid The initial molecule ID before checks.
 * @param molecule The molecule to set the ID foradd.
 * @param molecules The molecules map.
 * @returns The molecule ID set.
 */ function $174b37a7f81f9b54$var$setMoleculeID(mid, molecule, molecules) {
    while(true){
        // Ask the user to specify the molecule ID.
        let mid2 = prompt("Please enter a name for the molecule", mid);
        if (mid2 == null) alert("The molecule ID cannot be null.");
        else if (molecules.has(mid2)) alert("The molecule ID " + mid + " is already in use.");
        else {
            mid = mid2;
            molecule.setID(mid);
            return mid;
        }
    }
}
/**
 * Adds a button to edit the molecule ID.
 * @param molecule 
 * @param button 
 * @param moleculeDiv 
 * @param level 
 */ function $174b37a7f81f9b54$var$addEditIDButton(molecule, button, moleculeDiv, level) {
    let s_editName = (0, $7e68913db756e51f$export$96d8a15ea1620cf4) + " Edit id";
    let editNameButtonID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDiv.id, s_editName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e));
    let editNameButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(s_editName, editNameButtonID, level);
    moleculeDiv.appendChild(editNameButton);
    editNameButton.addEventListener("click", ()=>{
        let newMoleculeId = prompt("Please edit the molecule ID:", molecule.getID());
        if (newMoleculeId == null) newMoleculeId = "";
        // Update the BathGas select elements.
        (0, $7e68913db756e51f$export$8f4af86541f72bfe)((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, molecule.getID());
        molecule.setID(newMoleculeId);
        (0, $7e68913db756e51f$export$a30e0f90a7434924)((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, molecule.getID());
        button.textContent = molecule.getLabel() + " " + (0, $f0396edd0a5c99f7$export$e5e81646ee331a9e);
    });
}
/**
 * Process description.
 * @param id The id.
 * @param decription The description.
 * @param getter The getter function to call.
 * @param setter The setter function to call.
 * @param margin The boundary.
 */ function $174b37a7f81f9b54$var$processDescription(id, getter, setter, marginComponent, marginDiv) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, marginDiv);
    let buttonTextContentSelected = (0, $7e68913db756e51f$export$666359451816b0e7) + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = (0, $7e68913db756e51f$export$666359451816b0e7) + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), marginComponent);
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let inputId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $7e68913db756e51f$export$666359451816b0e7), (0, $7e68913db756e51f$export$58785e0018b77d4a));
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    } else {
        $174b37a7f81f9b54$var$addDescription(div, inputId, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(inputId) == null) {
            $174b37a7f81f9b54$var$addDescription(div, inputId, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param value The description value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 */ function $174b37a7f81f9b54$var$addDescription(div, id, value, setter, boundary) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value;
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", id, boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setter(target.value);
        console.log(id + " changed from " + value + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * 
 * Creates and returns a button for adding a new atom. This will add a new atom div to the atomArrayDiv. The atom div added
 * will have: label (atom id); editable details (elementType, x3, y3, z3); and a remove button. Select elements that allow 
 * for selecting atoms are updated so options reflect any added or removed atoms.
 * 
 * @param molecule The molecule.
 * @param aaDiv The atom array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function $174b37a7f81f9b54$var$getAddAtomButton(molecule, aaDiv, typeID, boundary, level) {
    // Create an add atom button.
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), (0, $7e68913db756e51f$export$bea69a603fae01a6)(aaDiv.id, "Add" + typeID + "Button"), level);
    button.addEventListener("click", ()=>{
        let attributes = new Map();
        let a = new (0, $01410cda1eef5011$export$80986e6afdd7e0cb)(attributes, molecule);
        //let aID: string = molecule.getAtoms().addAtom(a);
        aaDiv.insertBefore($174b37a7f81f9b54$var$addAtom(molecule, aaDiv.id, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}
function $174b37a7f81f9b54$var$addMetadata(m, md, ml, mdDivID, boundary, level) {
    ml.addMetadata(md);
    let mdDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(mdDivID, (0, $7e68913db756e51f$export$39c84188a71202f7));
    mdDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(m.getLabel(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b)));
    return mdDiv;
}
/**
 * Adds an atom.
 * 
 * @param molecule The molecule.
 * @param a The atom to add.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns A new div for the atom.
 */ function $174b37a7f81f9b54$var$addAtom(molecule, aaDivID, aa, a, boundary, level) {
    let aID = aa.addAtom(a, a.getID());
    let aDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aaDivID, aID);
    let aDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(aDivID, level);
    aDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(aID, boundary));
    let aIDs = new Set();
    // elementType.
    $174b37a7f81f9b54$var$processElementType(a, aDiv, aIDs, true, boundary);
    // Coordinates.
    $174b37a7f81f9b54$var$processCoordinates(a, aDiv, aIDs, boundary, boundary);
    (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(aDiv, boundary, $174b37a7f81f9b54$var$removeAtom, molecule, aID, aIDs);
    // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
    (0, $7e68913db756e51f$export$a30e0f90a7434924)((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2, aID);
    return aDiv;
}
/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param aID The atom id to remove.
 */ function $174b37a7f81f9b54$var$removeAtom(molecule, aID, aIDs) {
    molecule.getAtoms().removeAtom(aID);
    aIDs.forEach((x)=>{
        console.log("Removing " + x);
        (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(x);
    });
    (0, $7e68913db756e51f$export$8f4af86541f72bfe)((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2, aID);
    molecule.getBonds().bonds.forEach((bond)=>{
        let atomRefs2 = bond.getAtomRefs2();
        let atomRefs = atomRefs2.split(" ");
        if (atomRefs[0] == atomRefs[1]) {
            let bondId = bond.getID();
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            (0, $7e68913db756e51f$export$8f4af86541f72bfe)((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName, bondId);
            // remove the bondDiv element.
            let bID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName, molecule.id, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName, bondId);
            let bondDiv = document.getElementById(bID);
            if (bondDiv == null) throw new Error("Bond div with id " + bID + " not found.");
            else bondDiv.remove();
        }
    });
}
/**
 * For processing the elementType of an Atom.
 * @param a The atom.
 * @param aDiv The atom div which is appended to.
 * @param first If true, an option is added with instructions for the selection.
 * @param margin The margin for the components.
 * @returns A HTMLDivElement containing the HTMLLabelElement and HTMLSelectElement elements.
 */ function $174b37a7f81f9b54$var$processElementType(a, aDiv, aIDs, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = (0, $69ecbdaa96f3962d$export$692079bb871c6039).elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = (0, $7e68913db756e51f$export$d8b8827abc8ab7e7);
        (0, $7e68913db756e51f$export$10de1fc8385eec4a)(selectTypes, first);
    //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aDiv.id, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_elementType);
    aIDs.add(id);
    let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_elementType, selectTypes, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_elementType, elementType, id, margin, margin);
    let select = lws.querySelector("select");
    select.addEventListener("change", (event)=>{
        let target = event.target;
        a.setElementType(target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = elementType;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    (0, $7e68913db756e51f$export$3b08dcba56872ec6)(selectTypes, select);
    aDiv.appendChild(lws);
    return lws;
}
/**
 * Process atom coordinates.
 * @param a The atom.
 * @param aDiv The atom div.
 * @param margin The margin.
 */ function $174b37a7f81f9b54$var$processCoordinates(a, aDiv, aIDs, marginComponent, margin) {
    let id;
    id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aDiv.id, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_x3);
    aIDs.add(id);
    aDiv.appendChild((0, $7e68913db756e51f$export$17d48ee8ddbf2d44)(id, aIDs, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aDiv.id, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_y3);
    aIDs.add(id);
    aDiv.appendChild((0, $7e68913db756e51f$export$17d48ee8ddbf2d44)(id, aIDs, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aDiv.id, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_z3);
    aIDs.add(id);
    aDiv.appendChild((0, $7e68913db756e51f$export$17d48ee8ddbf2d44)(id, aIDs, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
}
/**
 * Creates and returns a button for adding a new bond. This will add a new bond div to the bondArrayDiv. The bond div added
 * will have: label (bond id); editable details (atomRefs2 and order); and a remove button. Select elements that allow for 
 * selecting bonds are updated so options reflect any added or removed bonds.
 * 
 * @param molecule The molecule.
 * @param baDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function $174b37a7f81f9b54$var$getAddBondButton(molecule, baDiv, typeID, boundary, level) {
    // Create an add button.
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(baDiv.id, typeID, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e));
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), id, level);
    button.addEventListener("click", ()=>{
        let atoms = molecule.getAtoms().atoms;
        if (atoms.size < 2) {
            alert("There must be at least 2 atoms to create a bond.");
            return;
        }
        let attributes = new Map();
        let atomRefs2 = Array.from(atoms.keys()).slice(0, 2).join(" ");
        attributes.set((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2, atomRefs2);
        let b = new (0, $01410cda1eef5011$export$153327fc99ac0c53)(attributes, molecule);
        baDiv.insertBefore($174b37a7f81f9b54$var$addBond(molecule, baDiv.id, atoms, molecule.getBonds(), b, boundary, level), button);
    });
    baDiv.appendChild(button);
    return button;
}
/**
 * Add a bond.
 * @param molecule The molecule.
 * @param atoms The atoms.
 * @param b The bond.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The a new div for the bond.
 */ function $174b37a7f81f9b54$var$addBond(molecule, baDivID, atoms, ba, b, boundary, level) {
    let bID = ba.addBond(b, b.getID());
    let bDivID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(baDivID, bID);
    let bDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(bDivID, level);
    bDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(bID, boundary));
    // atomRefs2.
    $174b37a7f81f9b54$var$processAtomRefs2(molecule, bDiv, b, boundary);
    // order.
    $174b37a7f81f9b54$var$processOrder(bDiv, b, boundary);
    // Add to the classlists so that bondDivs involving particular atoms can be found.
    Array.from(atoms.keys()).forEach((atomId)=>{
        bDiv.classList.add(atomId);
    });
    // Add remove button.
    let removeBond = (id)=>molecule.getBonds().removeBond(id);
    (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(bDiv, boundary, removeBond, bID);
    // Get elements with Bond className. These select elements are to be updated to include the new bond option.
    (0, $7e68913db756e51f$export$a30e0f90a7434924)((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName, bID);
    return bDiv;
}
/**
 * For processing the atomRefs2 of a Bond.
 * 
 * @param molecule The molecule.
 * @param bDiv The bond div.
 * @param bond The bond.
 * @param inputId The input id.
 * @param margin The margin for the components.
 */ function $174b37a7f81f9b54$var$processAtomRefs2(molecule, bDiv, bond, margin) {
    //let id = addRID(bDiv.id, Bond.s_atomRefs2);
    let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(bDiv.id, (0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    let alwsID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, 0);
    //let alwsID: string = addRID(id, 0);
    //bIDs.add(alwsID);
    let alws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2 + "[0]", atomRefOptions, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName, atomRefs[0], alwsID, margin, margin);
    let aselect = alws.querySelector("select");
    aselect.classList.add((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2);
    aselect.addEventListener("change", (event)=>{
        let target = event.target;
        let atomRefs2 = target.value + " " + atomRefs[1];
        console.log((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    aselect.value = atomRefs[0];
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(aselect);
    bDiv.appendChild(alws);
    // blws.
    let blwsID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, 1);
    //let blwsID: string = addRID(id, 1);
    //bIDs.add(blwsID);
    let blws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2 + "[1]", atomRefOptions, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName, atomRefs[1], blwsID, margin, margin);
    let bselect = blws.querySelector("select");
    bselect.classList.add((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2);
    bselect.addEventListener("change", (event)=>{
        let target = event.target;
        let atomRefs2 = atomRefs[0] + " " + target.value;
        console.log((0, $01410cda1eef5011$export$153327fc99ac0c53).s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    bselect.value = atomRefs[1];
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(bselect);
    bDiv.appendChild(blws);
}
/**
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */ function $174b37a7f81f9b54$var$processOrder(bondDiv, bond, margin) {
    //let id = addRID(bondDiv.id, Bond.s_order);
    let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(bondDiv.id, (0, $01410cda1eef5011$export$153327fc99ac0c53).s_order);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = (0, $01410cda1eef5011$export$153327fc99ac0c53).s_order + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = (0, $01410cda1eef5011$export$153327fc99ac0c53).s_order + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    } else {
        $174b37a7f81f9b54$var$addOrder(div, bond, id, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(id) == null) {
            if (value == undefined) value = 1;
            $174b37a7f81f9b54$var$addOrder(div, bond, id, value, margin);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */ function $174b37a7f81f9b54$var$addOrder(div, bond, id, value, boundary) {
    let valueString = value.toString();
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $01410cda1eef5011$export$153327fc99ac0c53).orderOptions, (0, $01410cda1eef5011$export$153327fc99ac0c53).s_order, valueString, id, boundary);
    select.addEventListener("change", (event)=>{
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log((0, $01410cda1eef5011$export$153327fc99ac0c53).s_order + " changed from " + valueString + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = valueString;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    select.id = id;
    div.appendChild(select);
}
/**
 * Process an order.
 * @param hrpDiv The HinderedRotorPotential div.
 * @param margin The margin for components.
 */ function $174b37a7f81f9b54$var$processUseSineTerms(hrpDiv, hrp, margin) {
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDiv.id, (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_useSineTerms);
    let buttonTextContentSelected = (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_useSineTerms + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_useSineTerms + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, margin);
    hrpDiv.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    if (hrp.getUseSineTerms() == true) {
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (hrp.getUseSineTerms() == false) {
            hrp.setUseSineTerms(true);
            button.textContent = buttonTextContentSelected;
        } else {
            hrp.setUseSineTerms(false);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
function $174b37a7f81f9b54$export$ce852d72abd87240(xml, molecules) {
    // Create div to contain the molecules list.
    let mlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    // Get the XML "moleculeList" element.
    let xml_ml = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let mlTagNames = new Set();
    xml_ml.childNodes.forEach(function(node) {
        mlTagNames.add(node.nodeName);
    });
    if (mlTagNames.size != 1) {
        if (!(mlTagNames.size == 2 && mlTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            mlTagNames.forEach((x)=>console.error(x));
            console.warn("Additional tag names in moleculeList:");
        }
    }
    if (!mlTagNames.has((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName)) {
        console.warn('Expecting tags with "' + (0, $01410cda1eef5011$export$3da9759ad07746a3).tagName + '" tagName but there are none!');
        return mlDiv;
    }
    // Process the XML "molecule" elements.
    let xml_ms = xml_ml.getElementsByTagName((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_msl; i++){
        // Create a new Molecule.
        let mDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $01410cda1eef5011$export$3da9759ad07746a3).tagName, i);
        let mDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mDivID);
        let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ms[i]);
        let m = new (0, $01410cda1eef5011$export$3da9759ad07746a3)(attributes, attributes.get((0, $01410cda1eef5011$export$3da9759ad07746a3).s_id));
        (0, $7e68913db756e51f$export$ac55d333e780178c)(m, molecules);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let mcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mcDivID, mlDiv, null, mDiv, m.label, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Create a set of molecule tag names.
        let moleculeTagNames = new Set();
        let cns = xml_ms[i].childNodes;
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!moleculeTagNames.has(cn.nodeName)) moleculeTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        // Add edit Name button.
        $174b37a7f81f9b54$var$addEditIDButton(m, mcDiv.querySelector((0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), mDiv, (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Description
        mDiv.appendChild($174b37a7f81f9b54$var$processDescription((0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $7e68913db756e51f$export$666359451816b0e7)), m.getDescription.bind(m), m.setDescription.bind(m), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        // Init metadataList.
        //console.log("Init metadataList.");
        let xml_mls = xml_ms[i].getElementsByTagName((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        if (xml_mls.length > 0) {
            if (xml_mls.length > 1) console.warn("Expecting 1 or 0 " + (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName + " but finding " + xml_mls.length + ". Loading the first of these...");
            // Create collapsible MetadataList HTMLDivElement.
            let mlDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
            let mlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mlDivID);
            let mlcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mlDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let mlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mlcDivID, mDiv, null, mlDiv, (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let xml_ml = xml_mls[0];
            let xml_ms = xml_ml.getElementsByTagName((0, $97ed023cfe5af5b8$export$e7adebdc1ebd2fed).tagName);
            let ml = new (0, $97ed023cfe5af5b8$export$3e18a603070a78a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mls[0]));
            m.setMetadataList(ml);
            for(let j = 0; j < xml_ms.length; j++){
                // Create a new Metadata.
                let md = new (0, $97ed023cfe5af5b8$export$e7adebdc1ebd2fed)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ms[j]));
                mlDiv.appendChild($174b37a7f81f9b54$var$addMetadata(m, md, ml, (0, $7e68913db756e51f$export$bea69a603fae01a6)(mlDivID, j), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            }
            moleculeTagNames.delete((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
        }
        // Init atoms.
        let xml_aas = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName);
        let aaDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(aaDivID);
        let aacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(aaDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let aacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(aacDivID, mDiv, null, aaDiv, (0, $01410cda1eef5011$export$9cea715eceba39a0).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // There should be at least one atom!
        // Atoms may be in AtomArrays or not.
        // If any AtomArray elements have attributes, there will be a console warning.
        // There will be a single AtomArray containing any Atoms.
        let aa = new (0, $01410cda1eef5011$export$9cea715eceba39a0)(new Map());
        m.setAtoms(aa);
        for(let j = 0; j < xml_aas.length; j++){
            let aaa = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_aas[j]);
            if (aaa.size > 0) console.warn("AtomArray attributes lost/ignored: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(aaa));
        }
        let xml_as = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName);
        for(let j = 0; j < xml_as.length; j++)aaDiv.appendChild($174b37a7f81f9b54$var$addAtom(m, aaDivID, aa, new (0, $01410cda1eef5011$export$80986e6afdd7e0cb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_as[j]), m), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        aaDiv.appendChild($174b37a7f81f9b54$var$getAddAtomButton(m, aaDiv, (0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        moleculeTagNames.delete((0, $01410cda1eef5011$export$80986e6afdd7e0cb).tagName);
        // Init bonds.
        let xml_bas = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName);
        let baDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(baDivID);
        let bacDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(baDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let bacDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(bacDivID, mDiv, null, baDiv, (0, $01410cda1eef5011$export$746fba2e30d93fe6).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Bonds may be in BondArrays or not.
        // If any BondArray elements have attributes, there will be a console warning.
        // There will be a single BondArray containing any Bonds.
        let ba = new (0, $01410cda1eef5011$export$746fba2e30d93fe6)(new Map());
        m.setBonds(ba);
        for(let j = 0; j < xml_bas.length; j++){
            let baa = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bas[j]);
            if (baa.size > 0) console.warn("BondArray attributes lost/ignored: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(baa));
        }
        let xml_bs = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
        for(let j = 0; j < xml_bs.length; j++){
            // Load those bonds that have an id attribute first.
            let b_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bs[j]);
            if (b_attributes.has((0, $01410cda1eef5011$export$153327fc99ac0c53).s_id)) baDiv.appendChild($174b37a7f81f9b54$var$addBond(m, baDivID, m.getAtoms().atoms, ba, new (0, $01410cda1eef5011$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bs[j]), m), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        }
        // Load those bonds that do not have an id attribute.
        for(let j = 0; j < xml_bs.length; j++){
            let b_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bs[j]);
            if (!b_attributes.has((0, $01410cda1eef5011$export$153327fc99ac0c53).s_id)) baDiv.appendChild($174b37a7f81f9b54$var$addBond(m, baDivID, m.getAtoms().atoms, ba, new (0, $01410cda1eef5011$export$153327fc99ac0c53)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bs[j]), m), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        }
        baDiv.appendChild($174b37a7f81f9b54$var$getAddBondButton(m, baDiv, (0, $01410cda1eef5011$export$153327fc99ac0c53).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
        moleculeTagNames.delete((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, "viewer");
        let viewerDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(viewerDivID);
        let viewercDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(viewerDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let viewercDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(viewercDivID, mDiv, null, viewerDiv, "viewer", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        $174b37a7f81f9b54$export$7aad7e61c4f49964(m, viewerDiv, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Init properties.
        let xml_pls = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
        // Create a new collapsible div for the PropertyList.
        let plDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName);
        let plDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(plDivID);
        let plcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(plDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let plcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(plcDivID, mDiv, null, plDiv, (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Properties may be in PropertyLists or not.
        // This implementation allows for there to be multiple PropertyList elements.
        // If any PropertyList elements have attributes, there will be a console warning.
        // There will be a single PropertyList containing any Properties.
        let pl = new (0, $01410cda1eef5011$export$4e0d1ad7ad6a0802)(new Map());
        m.setPropertyList(pl);
        for(let j = 0; j < xml_pls.length; j++){
            let pla = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pls[j]);
            if (pla.size > 0) console.warn("PropertyList attributes lost/ignored: " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(pla));
        }
        let pap = new Set((0, $01410cda1eef5011$export$9f93a3fdf2490572).propertyDictRefs);
        let xml_ps = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$41b04b3a73e7216d).tagName);
        for(let j = 0; j < xml_ps.length; j++){
            // Create a new Property.
            let p = $174b37a7f81f9b54$var$createProperty(pap, pl, xml_ps[j], plDiv, m, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            pl.setProperty(p);
        }
        /* This code is currently commented out as it is not wanted yet. The idea is that  
        properties would be selectable a bit like controls, and all those not loaded in a 
        file would be deselected and selectable. As there could be additional properties 
        in future or that are not known about, some way of adding these will likely also be 
        wanted...
        // Add Properties not in xml_ps.
        console.log("Molecule " + m.getDescription());
        console.log("pap.size=" + pap.size);
        pap.forEach(function (dictRef) {
            console.log("dictRef=" + dictRef);
            let attributes: Map<string, string> = new Map();
            attributes.set(Property.s_dictRef, dictRef);
            if (dictRef == "me:Hf0") {
                let vs: string = "";
                if (defaults != undefined) {
                    vs = defaults.values.get(dictRef) ?? "";
                }
                let value: Big;
                try {
                    value = new Big(vs);
                } catch (e) {
                    value = new Big("0");
                }
                let s_attributes: Map<string, string> = new Map();
                s_attributes.set("units", "kJ/mol");
                let ps: PropertyScalarNumber = new PropertyScalarNumber(s_attributes, value);
                let p: Property = new Hf0(attributes, ps);

                let iDs: Set<string> = new Set();

                //attributes.set(Hf0.s_units, "kJ/mol");
                addPropertyScalarNumber(s_attributes, iDs, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
                pl.setProperty(p);
                
                } else if (dictRef == "me:ZPE") {
                    let value: Big = new Big("0");
                    let ps: PropertyScalar = new PropertyScalar(new Map(), value);
                    //let ps: PropertyScalar = new PropertyScalar(new Map(), defaults.get(dictRef));
                    let p: Property = new ZPE(attributes, ps);
                    //plDiv.appendChild(addProperty(dictRef, ps, addID(plDivID, dictRef), boundary1, level1));
 
                    addPropertyScalar(attributes, value, Mesmer.energyUnits, pl, p, plDiv, boundary1);
 
                    pl.setProperty(p);
                
            }
        });
        */ // Organise EnergyTransferModel.
        let xml_etms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$499950da20810ac9).tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$499950da20810ac9).tagName + " but finding " + xml_etms.length + "!");
            let etm = new (0, $01410cda1eef5011$export$499950da20810ac9)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_etms[0]));
            $174b37a7f81f9b54$var$processEnergyTransferModel(etm, m, xml_etms[0], mDiv);
            moleculeTagNames.delete((0, $01410cda1eef5011$export$499950da20810ac9).tagName);
        }
        // Organise DOSCMethod.
        let xml_dms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$bbdce6c921702068).tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$bbdce6c921702068).tagName + " but finding " + xml_dms.length + "!");
            let doscm = new (0, $01410cda1eef5011$export$bbdce6c921702068)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dms[0]));
            mDiv.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$bbdce6c921702068).tagName, (0, $01410cda1eef5011$export$bbdce6c921702068).xsi_typeOptions, (0, $01410cda1eef5011$export$bbdce6c921702068).tagName, doscm.getXsiType(), (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$bbdce6c921702068).tagName), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            moleculeTagNames.delete((0, $01410cda1eef5011$export$bbdce6c921702068).tagName);
        }
        // Organise DistributionCalcMethod. (Output only)
        let xml_dcms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$3f9657e7f71262a).tagName);
        if (xml_dcms.length > 0) {
            if (xml_dcms.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$3f9657e7f71262a).tagName + " but finding " + xml_dcms.length + "!");
            let dcmAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dcms[0]);
            let dcm = new (0, $01410cda1eef5011$export$3f9657e7f71262a)(dcmAttributes);
            m.setDistributionCalcMethod(dcm);
            let dcmDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$3f9657e7f71262a).tagName);
            let dcmDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(dcmDivID);
            mDiv.appendChild(dcmDiv);
            // Create label.
            dcmDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $01410cda1eef5011$export$3f9657e7f71262a).tagName + " " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(dcmAttributes), (0, $7e68913db756e51f$export$39c84188a71202f7)));
            moleculeTagNames.delete((0, $01410cda1eef5011$export$3f9657e7f71262a).tagName);
        }
        // Organise DensityOfStatesList. (Output only)
        let xml_dosl = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$dcce836c71a83df).tagName);
        if (xml_dosl.length > 0) {
            if (xml_dosl.length > 1) throw new Error("Expecting 1 or 0 " + (0, $01410cda1eef5011$export$dcce836c71a83df).tagName + " but finding " + xml_dosl.length + "!");
            let dosl = new (0, $01410cda1eef5011$export$dcce836c71a83df)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dosl[0]));
            m.setDensityOfStatesList(dosl);
            // Create collapsible div.
            let doslDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$dcce836c71a83df).tagName);
            let doslDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(doslDivID);
            let doslcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(doslDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let doslcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(doslcDivID, mDiv, null, doslDiv, (0, $01410cda1eef5011$export$dcce836c71a83df).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let xml_dos = xml_dosl[0].getElementsByTagName((0, $01410cda1eef5011$export$126b026a4280c589).tagName);
            // Organise Description.
            let xml_ds = xml_dosl[0].getElementsByTagName((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
            if (xml_ds.length > 0) {
                if (xml_ds.length > 1) throw new Error("Expecting 1 or 0 " + (0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName + " but finding " + xml_ds.length + "!");
                let ds = new (0, $69ecbdaa96f3962d$export$393edc798c47379d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ds[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ds[0])));
                dosl.setDescription(ds);
            }
            // Organise DensityOfStates.
            //console.log("xml_dos.length=" + xml_dos.length);
            if (xml_dos.length == 0) throw new Error("Expecting 1 or more " + (0, $01410cda1eef5011$export$126b026a4280c589).tagName + " but finding 0!");
            else {
                let t = (0, $f0396edd0a5c99f7$export$33bbb3ec7652e187)((0, $7e68913db756e51f$export$bea69a603fae01a6)(doslDivID, (0, $7e68913db756e51f$export$7a850709da5c4f5b)), (0, $7e68913db756e51f$export$39c84188a71202f7));
                (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, (0, $01410cda1eef5011$export$126b026a4280c589).header);
                // Append the table to the div.
                doslDiv.appendChild(t);
                for(let j = 0; j < xml_dos.length; j++){
                    //console.log("j=" + j);
                    let dos = new (0, $01410cda1eef5011$export$126b026a4280c589)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    let dosDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(doslDivID, j);
                    let dosDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(dosDivID, (0, $7e68913db756e51f$export$39c84188a71202f7));
                    doslDiv.appendChild(dosDiv);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
                    if (xml_t.length != 1) throw new Error("Expecting 1 " + (0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName + " but finding " + xml_t.length + "!");
                    else {
                        let t = new (0, $69ecbdaa96f3962d$export$971d5caa766a69d7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_t[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_t[0]))));
                        dos.setT(t);
                    //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$656e8af5996be26).tagName);
                    if (xml_qtot.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$656e8af5996be26).tagName + " but finding " + xml_qtot.length + "!");
                    else {
                        let qtot = new (0, $01410cda1eef5011$export$656e8af5996be26)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_qtot[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                    //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$c8de58561fc3a710).tagName);
                    if (xml_sumc.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$c8de58561fc3a710).tagName + " but finding " + xml_sumc.length + "!");
                    else {
                        let sumc = new (0, $01410cda1eef5011$export$c8de58561fc3a710)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_sumc[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                    //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName((0, $01410cda1eef5011$export$159051b21d796f59).tagName);
                    if (xml_sumg.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$159051b21d796f59).tagName + " but finding " + xml_sumg.length + "!");
                    else {
                        let sumg = new (0, $01410cda1eef5011$export$159051b21d796f59)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_sumg[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                    //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                    (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, dos.toStringArray());
                //console.log("dos: " + dos.toString());
                }
                (0, $7e68913db756e51f$export$dd526fb3a2a9c049)(dosl.toCSV, doslDiv, t, m.getID() + "_" + (0, $01410cda1eef5011$export$dcce836c71a83df).tagName, (0, $7e68913db756e51f$export$39c84188a71202f7));
            }
            moleculeTagNames.delete((0, $01410cda1eef5011$export$dcce836c71a83df).tagName);
        }
        // Organise ThermoTable. (Output only)
        let tttn = (0, $01410cda1eef5011$export$96f29f03cf201f97).tagName;
        let xml_tts = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            let tt = new (0, $01410cda1eef5011$export$96f29f03cf201f97)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tts[0]));
            // Create collapsible div.
            let ttDivId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$96f29f03cf201f97).tagName);
            let ttDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(ttDivId);
            let ttcDivId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(ttDivId, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let ttcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ttcDivId, mDiv, null, ttDiv, tttn, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let tvs;
            let tvtn = (0, $01410cda1eef5011$export$3ee0c201412b230).tagName;
            let xml_tvs = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            else {
                tvs = [];
                let t = (0, $f0396edd0a5c99f7$export$33bbb3ec7652e187)((0, $7e68913db756e51f$export$bea69a603fae01a6)(ttDivId, (0, $7e68913db756e51f$export$7a850709da5c4f5b)), (0, $7e68913db756e51f$export$39c84188a71202f7));
                (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, tt.getHeader());
                for(let j = 0; j < xml_tvs.length; j++){
                    let tv = new (0, $01410cda1eef5011$export$3ee0c201412b230)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tvs[j]));
                    tvs.push(tv);
                    (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, tv.toStringArray());
                }
                // Append the table to the div.
                ttDiv.appendChild(t);
                tt.init(tvs);
                (0, $7e68913db756e51f$export$dd526fb3a2a9c049)(tt.toCSV.bind(tt), ttDiv, t, m.getID() + "_" + (0, $01410cda1eef5011$export$96f29f03cf201f97).tagName, (0, $7e68913db756e51f$export$39c84188a71202f7));
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$ae98b7db6376163d).tagName);
        if (xml_edms.length > 0) for(let j = 0; j < xml_edms.length; j++){
            let edm = new (0, $01410cda1eef5011$export$ae98b7db6376163d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_edms[j]));
            // Create collapsible ExtraDOSCMethod HTMLDivElement.
            let edmDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mDivID, (0, $01410cda1eef5011$export$ae98b7db6376163d).tagName, j);
            let edmDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(edmDivID);
            let edmcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(edmDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let edmcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(edmcDivID, mDiv, null, edmDiv, (0, $01410cda1eef5011$export$ae98b7db6376163d).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            // Read bondRef.
            let xml_brs = xml_edms[j].getElementsByTagName((0, $01410cda1eef5011$export$aef8e5ad5552fd72).tagName);
            if (xml_brs.length > 0) {
                if (xml_brs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                let bids = m.getBonds().getBondIds();
                let br = new (0, $01410cda1eef5011$export$aef8e5ad5552fd72)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_brs[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_brs[0])));
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$aef8e5ad5552fd72).tagName, bids, (0, $01410cda1eef5011$export$aef8e5ad5552fd72).tagName, br.value, (0, $7e68913db756e51f$export$bea69a603fae01a6)(edmDivID, (0, $01410cda1eef5011$export$aef8e5ad5552fd72).tagName), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                let select = lws.getElementsByTagName("select")[0];
                select.classList.add((0, $01410cda1eef5011$export$153327fc99ac0c53).tagName);
                edmDiv.appendChild(lws);
            }
            // Read hinderedRotorPotential.
            let xml_hrps = xml_edms[j].getElementsByTagName((0, $01410cda1eef5011$export$9b8e857b9a081d2).tagName);
            if (xml_hrps.length > 0) {
                if (xml_hrps.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                let hrpAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_hrps[0]);
                let hrp = new (0, $01410cda1eef5011$export$9b8e857b9a081d2)(hrpAttributes);
                // Create collapsible HinderedRotorPotential HTMLDivElement.
                let hrpDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(edmDivID, (0, $01410cda1eef5011$export$9b8e857b9a081d2).tagName);
                let hrpDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(hrpDivID);
                let hrpcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
                let hrpcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(hrpcDivID, edmDiv, null, hrpDiv, (0, $01410cda1eef5011$export$9b8e857b9a081d2).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                // Format.
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $01410cda1eef5011$export$9b8e857b9a081d2).s_format, (0, $01410cda1eef5011$export$9b8e857b9a081d2).formats, (0, $01410cda1eef5011$export$9b8e857b9a081d2).tagName, hrp.getFormat(), (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDivID, (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_format), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                hrpDiv.appendChild(lws);
                // Units.
                (0, $7e68913db756e51f$export$2b2254f82abcc900)((0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits, hrpAttributes, hrpDiv, lws, (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDivID, (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_units), (0, $01410cda1eef5011$export$9b8e857b9a081d2).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                // ExpansionSize.
                let es = hrp.getExpansionSize() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                hrpDiv.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDivID, (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_expansionSize), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    try {
                        console.log("Setting " + (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_expansionSize + " to " + target.value);
                        hrp.setExpansionSize(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
                    } catch (e) {
                        alert("Invalid value, resetting...");
                        target.value = hrp.getExpansionSize() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                    }
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                }, es, (0, $01410cda1eef5011$export$9b8e857b9a081d2).s_expansionSize));
                // Add useSineTerms.
                $174b37a7f81f9b54$var$processUseSineTerms(hrpDiv, hrp, (0, $7e68913db756e51f$export$39c84188a71202f7));
                // Load PotentialPoints.
                // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                let ppsDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(hrpDivID, (0, $01410cda1eef5011$export$86ca5149fcde8feb).tagName);
                let ppsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(ppsDivID);
                let ppscDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(ppsDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
                let ppscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ppscDivID, mDiv, null, ppsDiv, "PotentialPoints", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                hrpDiv.appendChild(ppscDiv);
                let pps = [];
                let xml_pps = xml_hrps[0].getElementsByTagName((0, $01410cda1eef5011$export$86ca5149fcde8feb).tagName);
                for(let k = 0; k < xml_pps.length; k++){
                    let pp = new (0, $01410cda1eef5011$export$86ca5149fcde8feb)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pps[k]));
                    pps.push(pp);
                    let ppDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(ppsDivID, k);
                    let ppDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(ppDivID, (0, $7e68913db756e51f$export$39c84188a71202f7));
                    ppsDiv.appendChild(ppDiv);
                    let l = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $01410cda1eef5011$export$86ca5149fcde8feb).tagName + " " + k, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                    ppDiv.appendChild(l);
                    // Process angle
                    let a = pp.getAngle() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                    let anglelwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", (0, $7e68913db756e51f$export$bea69a603fae01a6)(ppDivID, (0, $01410cda1eef5011$export$86ca5149fcde8feb).s_angle), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
                            pp.setAngle(value);
                        } else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            target.value = pp.getAngle() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
                    }, a, (0, $01410cda1eef5011$export$86ca5149fcde8feb).s_angle);
                    ppDiv.appendChild(anglelwi);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $01410cda1eef5011$export$86ca5149fcde8feb).s_potential, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                    ppDiv.appendChild(potentialLabel);
                    let potentialInputElementId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(ppDivID, (0, $01410cda1eef5011$export$86ca5149fcde8feb).s_potential);
                    let potentialInputElement = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", potentialInputElementId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                    ppDiv.appendChild(potentialInputElement);
                    let p = pp.getPotential() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                    potentialInputElement.addEventListener("change", (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
                            pp.setPotential(value);
                            console.log("Set " + (0, $01410cda1eef5011$export$86ca5149fcde8feb).tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = pp.getPotential() ?? (0, $7e68913db756e51f$export$2f2abd8810196a7);
                        }
                        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(potentialInputElement);
                    });
                    potentialInputElement.value = p;
                    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(potentialInputElement);
                }
                //ppsDiv.appendChild(ppDiv);
                hrp.setPotentialPoints(pps);
                edm.setHinderedRotorPotential(hrp);
            }
            // Read periodicities.
            let xml_periodicities = xml_edms[j].getElementsByTagName((0, $01410cda1eef5011$export$9513c16afdf7d852).tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_periodicities[0]));
                let periodicity = new (0, $01410cda1eef5011$export$9513c16afdf7d852)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_periodicities[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString));
                edm.setPeriodicity(periodicity);
                let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", (0, $7e68913db756e51f$export$bea69a603fae01a6)(edmDivID, (0, $01410cda1eef5011$export$9513c16afdf7d852).tagName), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                    let target = event.target;
                    valueString = target.value;
                    if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(valueString)) {
                        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
                        periodicity.value = value;
                        edm.getPeriodicity().value = value;
                        console.log("Set " + (0, $01410cda1eef5011$export$9513c16afdf7d852).tagName + " to " + value);
                    } else {
                        // Reset the input to the current value.
                        alert("Periodicity input is not a number, resetting...");
                        target.value = periodicity.value.toExponential();
                    }
                }, valueString, (0, $01410cda1eef5011$export$9513c16afdf7d852).tagName);
                edmDiv.appendChild(lwi);
            }
            m.setExtraDOSCMethod(j, edm);
            moleculeTagNames.delete((0, $01410cda1eef5011$export$ae98b7db6376163d).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, $01410cda1eef5011$export$97850fe2f2906f00).tagName);
        let xml_ReservoirSize = xml_ms[i].getElementsByTagName((0, $01410cda1eef5011$export$97850fe2f2906f00).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ReservoirSize[0]));
            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
            let reservoirSizeAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ReservoirSize[0]);
            let reservoirSize = new (0, $01410cda1eef5011$export$97850fe2f2906f00)(reservoirSizeAttributes, value);
            m.setReservoirSize(reservoirSize);
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", m.getID() + "_" + (0, $01410cda1eef5011$export$97850fe2f2906f00).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                let target = event.target;
                reservoirSize.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
            }, valueString, (0, $01410cda1eef5011$export$97850fe2f2906f00).tagName);
            mDiv.appendChild(inputDiv);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
    }
    // Create an add molecule button.
    let mb = $174b37a7f81f9b54$export$12aafb9570dfb660(mlDiv, molecules);
    // Create add from library button.
    let lb = $174b37a7f81f9b54$export$1f1b9bc888fe9f4c(mlDiv, mb, molecules);
    return mlDiv;
}
/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */ function $174b37a7f81f9b54$var$createProperty(pap, pl, xml, plDiv, molecule, boundary, level) {
    let p = new (0, $01410cda1eef5011$export$41b04b3a73e7216d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml));
    pap.delete(p.dictRef);
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == (0, $01410cda1eef5011$export$95174cf0748f45cd).dictRef) // "me:ZPE", scalar, Mesmer.energyUnits.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$90bccbae54bb6d4f).dictRef) // "me:Hf0", scalar, Mesmer.energyUnits.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$a4fe62a56eafa45d).dictRef) // "me:HfAT0", scalar, Mesmer.energyUnits.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$e7df60530792b964).dictRef) // "me:Hf298", scalar, Mesmer.energyUnits.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$984abe26ded13ee0).dictRef) // "me:rotConsts", array, Mesmer.frequencyUnits.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, (0, $69ecbdaa96f3962d$export$692079bb871c6039).frequencyUnits, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$d1d1720eff14586a).dictRef) // "me:symmetryNumber", scalar, No units.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$886461cafebcdaed).dictRef) // "me:TSOpticalSymmetryNumber", scalar, No units.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$1288989e9be37590).dictRef) // "me:frequenciesScaleFactor", scalar, No units.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$2762c8fbc03043ca).dictRef) // "me:vibFreqs", array, cm-1.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$a3772f6eb527275b).dictRef) // "me:MW", scalar, amu.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$415ad1120b60f9f3).dictRef) // "me:spinMultiplicity", scalar, No units.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$cb998ac70542b2c3).dictRef) // "me:epsilon", scalar, K (fixed).
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$79e850ed2864d13d).dictRef) // "me:sigma", scalar, Å (fixed).
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$789e4dcdcb815c05).dictRef) // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$f3e9ef5020c299b5).dictRef) // "me:EinsteinAij", array, s-1 (fixed).
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, $01410cda1eef5011$export$25f02bc420569a7e).dictRef) // "me:EinsteinBij", array, m3/J/s2 (fixed).
    (0, $7e68913db756e51f$export$2aabceac90b71d10)(pl, p, undefined, molecule, xml, plDiv, boundary, level);
    else (0, $7e68913db756e51f$export$9d37ed1c0ac75637)(pl, p, molecule, xml, plDiv, boundary, level);
    return p;
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */ function $174b37a7f81f9b54$var$processEnergyTransferModel(etm, molecule, element, moleculeDiv) {
    let xml_deltaEDowns = element.getElementsByTagName((0, $01410cda1eef5011$export$16fc56ab40b12b45).tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDiv.id, (0, $01410cda1eef5011$export$499950da20810ac9).tagName);
        let etmDiv = document.createElement("div");
        let etmcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(etmdivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let etmcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(etmcDivID, moleculeDiv, null, etmDiv, (0, $01410cda1eef5011$export$499950da20810ac9).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        let deltaEDowns = [];
        for(let k = 0; k < xml_deltaEDowns.length; k++){
            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_deltaEDowns[k]);
            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
            let deltaEDownAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_deltaEDowns[k]);
            let deltaEDown = new (0, $01410cda1eef5011$export$16fc56ab40b12b45)(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = (0, $01410cda1eef5011$export$16fc56ab40b12b45).tagName;
            // Create a new div element for the input.
            let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(etmdivID, (0, $01410cda1eef5011$export$16fc56ab40b12b45).tagName, k);
            let inputDiv = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                let target = event.target;
                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "units cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function $174b37a7f81f9b54$export$7aad7e61c4f49964(molecule, moleculeDiv, boundary, level) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDiv.id, "viewerContainer");
    let viewerContainerDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(moleculeDiv.id, "viewer");
    let showAtomLabels = false;
    let showBondLabels = false;
    // Create the GLViewer viewer.
    function createViewer(//cameraPosition: any, cameraOrientation: any, zoomLevel: any, 
    showAtomLabels, showBondLabels) {
        let viewerDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = {
            backgroundColor: "grey"
        };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({
            stick: {}
        });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function(atom) {
            let et = atom.getElementType();
            let color;
            if (et == undefined) color = "Purple";
            else color = (0, $69ecbdaa96f3962d$export$692079bb871c6039).atomColors.get(et) || "Purple";
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius;
            if (et == undefined) radius = 100;
            else radius = (0, $69ecbdaa96f3962d$export$692079bb871c6039).atomRadii.get(atom.getElementType()) || 100;
            let ax = atom.getX3()?.toNumber() || 0;
            let ay = atom.getY3()?.toNumber() || 0;
            let az = atom.getZ3()?.toNumber() || 0;
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: 0.3 * am / 10.0, color: color });
            viewer.addSphere({
                center: {
                    x: ax,
                    y: ay,
                    z: az
                },
                radius: radius / 110.0,
                color: color
            });
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
            if (showAtomLabels) viewer.addLabel(atom.getID(), {
                position: {
                    x: ax,
                    y: ay,
                    z: az
                }
            });
        });
        //console.log("molecule.getBonds().bonds.size " + molecule.getBonds().bonds.size);
        molecule.getBonds().bonds.forEach(function(bond) {
            //console.log("bond.atomRefs2 " + bond.getAtomRefs2());
            let ids = bond.getAtomRefs2().split(" ");
            let aa = molecule.getAtoms();
            let a0 = aa.getAtom(ids[0]);
            let a1 = aa.getAtom(ids[1]);
            let order = bond.getOrder() || 1;
            let color = (0, $69ecbdaa96f3962d$export$692079bb871c6039).bondColors.get(order) || "Purple";
            // a0.
            let a0x = a0.getX3()?.toNumber() || 0;
            let a0y = a0.getY3()?.toNumber() || 0;
            let a0z = a0.getZ3()?.toNumber() || 0;
            // a1.
            let a1x = a1.getX3()?.toNumber() || 0;
            let a1y = a1.getY3()?.toNumber() || 0;
            let a1z = a1.getZ3()?.toNumber() || 0;
            viewer.addCylinder({
                start: {
                    x: a0x,
                    y: a0y,
                    z: a0z
                },
                end: {
                    x: a1x,
                    y: a1y,
                    z: a1z
                },
                radius: 0.06 * order,
                color: color
            });
            if (showBondLabels) viewer.addLabel(bond.getID(), {
                position: {
                    x: (a0x + a1x) / 2,
                    y: (a0y + a1y) / 2,
                    z: (a0z + a1z) / 2
                }
            });
        });
        viewer.zoomTo();
        viewer.render();
        /*
        if (cameraPosition != undefined) {
            viewer.setCameraPosition(cameraPosition);
        }
        if (cameraOrientation != undefined) {
            viewer.setCameraOrientation(cameraOrientation);
        }
        if (zoomLevel != undefined) {
            viewer.zoom(zoomLevel, 2000);
        } else {
            viewer.zoom(0.8, 2000);
        }
        return viewer;
        */ viewer.zoom(0.8, 2000);
        return viewer;
    }
    // Add a redraw button.
    let redrawButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Draw/Redraw", undefined);
    let viewer;
    redrawButton.addEventListener("click", ()=>{
        (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(viewerDivID);
        viewer = createViewer(//undefined, undefined, undefined, 
        showAtomLabels, showBondLabels);
    });
    viewerContainerDiv.appendChild(redrawButton);
    // Helper function to create a label button for hiding or showing labels on the viewer.
    function createLabelButton(label, id, showState, updateState) {
        let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((showState ? "Hide " : "Show ") + label, id, boundary);
        button.addEventListener("click", ()=>{
            if (showState) {
                button.textContent = "Show " + label;
                showState = false;
            } else {
                button.textContent = "Hide " + label;
                showState = true;
            }
            /*
            let cameraPosition = viewer.getCameraPosition();
            let cameraOrientation = viewer.getCameraOrientation();
            let zoomLevel = viewer.getZoomLevel();
            */ updateState(showState);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(viewerDivID);
            viewer = createViewer(//cameraPosition, cameraOrientation, zoomLevel,
            showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, (0, $7e68913db756e51f$export$bea69a603fae01a6)(viewerDivID, s_Atom_Labels), showAtomLabels, (newState)=>showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, (0, $7e68913db756e51f$export$bea69a603fae01a6)(viewerDivID, s_Bond_Labels), showBondLabels, (newState)=>showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Save as PNG", (0, $7e68913db756e51f$export$bea69a603fae01a6)(viewerDivID, (0, $7e68913db756e51f$export$c1dfed4ad865f0b6)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    saveButton.addEventListener("click", ()=>{
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement("a");
        a.href = canvas;
        let title = (0, $7e68913db756e51f$export$3bb92be1f57fd129).getTitle()?.value;
        a.download = title.replace(/[^a-z0-9]/gi, "_") + "mol.png";
        document.body.appendChild(a); // Append the anchor to the body.
        a.click(); // Programmatically click the anchor to trigger the download.
        document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
        console.log("Save Image");
    });
    viewerContainerDiv.appendChild(saveButton);
}










class $28e4a0fe6fb3e45e$export$e8a062bb2fc9e2ba extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */ constructor(attributes){
        super(attributes, $28e4a0fe6fb3e45e$export$e8a062bb2fc9e2ba.tagName);
        this.ref = attributes.get("ref");
        this.role = attributes.get("role");
    }
    /**
     * @returns The ref attribute.
     */ getRef() {
        return this.ref;
    }
    /**
     * @param ref The ref attribute.
     */ setRef(ref) {
        this.ref = ref;
        this.attributes.set("ref", ref);
    }
    /**
     * @returns The role attribute.
     */ getRole() {
        return this.role;
    }
    /**
     * @param role The role of the molecule in the reaction.
     */ setRole(role) {
        this.role = role;
        this.attributes.set("role", role);
    }
}
class $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reactant";
    }
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "deficientReactant",
            "excessReactant",
            "modelled"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $28e4a0fe6fb3e45e$export$264ad599d7cef668 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "product";
    }
    static{
        /**
     * The role options.
     */ this.roleOptions = [
            "modelled",
            "sink"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $28e4a0fe6fb3e45e$export$264ad599d7cef668.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $28e4a0fe6fb3e45e$export$145c1ed87b1a2216 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:transitionState";
    }
    /**
     * @param attributes The attributes.
     * @param molecule The reaction molecule.
     */ constructor(attributes, molecule){
        super(attributes, $28e4a0fe6fb3e45e$export$145c1ed87b1a2216.tagName);
        this.addNode(molecule);
    }
    /**
     * @returns The molecule.
     */ getMolecule() {
        return this.nodes.get(0);
    }
}
class $28e4a0fe6fb3e45e$export$38ce90ac8b004d85 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:preExponential";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$1bdc69d2439d749d extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:activationEnergy";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$8d95dd32819bc86c extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:TInfinity";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$d08982dd841d496f extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:nInfinity";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$d08982dd841d496f.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$6fa70ee10f356b6 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:MCRCMethod";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6.tagName);
    }
}
class $28e4a0fe6fb3e45e$export$191e95ebb11cc88 extends $28e4a0fe6fb3e45e$export$6fa70ee10f356b6 {
    static{
        /**
     * The xsiType.
     */ this.xsiType = "me:MesmerILT";
    }
    static{
        /**
     * The tag name.
     */ this.xsiType2 = "MesmerILT";
    }
    /**
     * Should any parameters be specified as being optional?
     * @param attributes The attributes.
     * @param preExponential The pre-exponential factor (optional).
     * @param activationEnergy The activation energy (optional).
     * @param tInfinity The TInfinity (optional).
     * @param nInfinity The nInfinity (optional).
     */ constructor(attributes, preExponential, activationEnergy, tInfinity, nInfinity){
        super(attributes);
        this.index = new Map();
        if (preExponential != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$38ce90ac8b004d85.tagName, this.index.size);
            this.addNode(preExponential);
        }
        if (activationEnergy != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$1bdc69d2439d749d.tagName, this.index.size);
            this.addNode(activationEnergy);
        }
        if (tInfinity != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$8d95dd32819bc86c.tagName, this.index.size);
            this.addNode(tInfinity);
        }
        if (nInfinity != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$d08982dd841d496f.tagName, this.index.size);
            this.addNode(nInfinity);
        }
    }
    /**
     * @returns The pre-exponential factor or undefined if it does not exist.
     */ getPreExponential() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$38ce90ac8b004d85.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param preExponential The pre-exponential factor.
     */ setPreExponential(preExponential) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$38ce90ac8b004d85.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$38ce90ac8b004d85.tagName, this.nodes.size);
            this.addNode(preExponential);
        } else this.nodes.set(i, preExponential);
    }
    /**
     * @returns The activation energy or undefined if it does not exist.
     */ getActivationEnergy() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$1bdc69d2439d749d.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param activationEnergy The activation energy.
     */ setActivationEnergy(activationEnergy) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$1bdc69d2439d749d.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$1bdc69d2439d749d.tagName, this.nodes.size);
            this.addNode(activationEnergy);
        } else this.nodes.set(i, activationEnergy);
    }
    /**
     * @returns The TInfinity or undefined if it does not exist.
     */ getTInfinity() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$8d95dd32819bc86c.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param tInfinity The TInfinity.
     */ setTInfinity(tInfinity) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$8d95dd32819bc86c.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$8d95dd32819bc86c.tagName, this.nodes.size);
            this.addNode(tInfinity);
        } else this.nodes.set(i, tInfinity);
    }
    /**
     * @returns The NInfinity or undefined if it does not exist.
     */ getNInfinity() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$d08982dd841d496f.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param nInfinity The NInfinity.
     */ setNInfinity(nInfinity) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$d08982dd841d496f.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$d08982dd841d496f.tagName, this.nodes.size);
            this.addNode(nInfinity);
        } else this.nodes.set(i, nInfinity);
    }
}
class $28e4a0fe6fb3e45e$export$c3cf6f96dac11421 extends (0, $cc8c7201a9bad777$export$ca4ceee82ec565dc) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:tunneling";
    }
    static{
        /**
     * The options.
     */ this.options = [
            "Eckart",
            "WKB"
        ];
    }
    static{
        /**
     * The key to the name attribute value.
     */ this.s_name = "name";
    }
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421.tagName);
    }
    /**
     * @returns The name of the tunneling method.
     */ getName() {
        return this.attributes.get($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.s_name);
    }
    /**
     * @param The name of the tunneling method.
     */ setName(name) {
        this.attributes.set($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.s_name, name);
    }
}
class $28e4a0fe6fb3e45e$export$284227145ed02b04 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:excessReactantConc";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$284227145ed02b04.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$38dfac6a73b2b45e extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:val";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$38dfac6a73b2b45e.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$a292f79afb9ad235 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:rev";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$a292f79afb9ad235.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$835b53a514d067b0 extends (0, $cc8c7201a9bad777$export$82583fad49645fc9) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Keq";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, $28e4a0fe6fb3e45e$export$835b53a514d067b0.tagName, value);
    }
}
class $28e4a0fe6fb3e45e$export$5eb02c9a0d4a6c5 extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:kinf";
    }
    /**
     * @param attributes The attributes.
     * @param t The t.
     * @param val The val.
     * @param rev The rev.
     * @param Keq The Keq.
     */ constructor(attributes, t, val, rev, keq){
        super(attributes, $28e4a0fe6fb3e45e$export$5eb02c9a0d4a6c5.tagName);
        this.index = new Map();
        if (t != undefined) {
            this.index.set((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName, this.nodes.size);
            this.addNode(t);
        }
        if (val != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$38dfac6a73b2b45e.tagName, this.nodes.size);
            this.addNode(val);
        }
        if (rev != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$a292f79afb9ad235.tagName, this.nodes.size);
            this.addNode(rev);
        }
        if (keq != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$835b53a514d067b0.tagName, this.nodes.size);
            this.addNode(keq);
        }
    }
    /**
     * @returns The T node or undefined if it does not exist.
     */ getT() {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param t The T node.
     */ setT(t) {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
        if (i == undefined) {
            this.index.set((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName, this.nodes.size);
            this.addNode(t);
        } else this.nodes.set(i, t);
    }
    /**
     * @returns The Val node or undefined if it does not exist.
     */ getVal() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$38dfac6a73b2b45e.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param val The Val node.
     */ setVal(val) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$38dfac6a73b2b45e.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$38dfac6a73b2b45e.tagName, this.nodes.size);
            this.addNode(val);
        } else this.nodes.set(i, val);
    }
    /**
     * @returns The Rev node or undefined if it does not exist.
     */ getRev() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$a292f79afb9ad235.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param rev The Rev node.
     */ setRev(rev) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$a292f79afb9ad235.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$a292f79afb9ad235.tagName, this.nodes.size);
            this.addNode(rev);
        } else this.nodes.set(i, rev);
    }
    /**
     * @returns The Keq node or undefined if it does not exist.
     */ getKeq() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$835b53a514d067b0.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param keq The Keq node.
     */ setKeq(keq) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$835b53a514d067b0.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$835b53a514d067b0.tagName, this.nodes.size);
            this.addNode(keq);
        } else this.nodes.set(i, keq);
    }
    /**
    * The header.
    */ getHeader() {
        let header = [];
        header.push("T (" + this.getT()?.attributes.get("units") + ")");
        header.push("kf (" + this.getVal()?.attributes.get("units") + ")");
        header.push("krev (" + this.getRev()?.attributes.get("units") + ")");
        header.push("Keq (" + this.getKeq()?.attributes.get("units") + ")");
        return header;
    }
    /**
     * @returns The Kinf as a string[].
     */ toStringArray() {
        let t = this.getT();
        let val = this.getVal();
        let rev = this.getRev();
        let keq = this.getKeq();
        //return [t.getValue().toString(), val.getValue().toString(), rev.getValue().toString(), keq.getValue().toString()];
        return [
            t.value.toString(),
            val.value.toString(),
            rev.value.toString(),
            keq.value.toString()
        ];
    }
    /**
     * @returns The Kinf as a CSV string.
     */ toCSV() {
        return this.toStringArray().join(",");
    }
}
class $28e4a0fe6fb3e45e$export$3f85289af9546f7e extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:canonicalRateList";
    }
    /**
     * @param attributes The attributes.
     * @param canonicalRate The canonical rate.
     */ constructor(attributes, description, kinfs){
        super(attributes, $28e4a0fe6fb3e45e$export$3f85289af9546f7e.tagName);
        this.index = new Map();
        this.kinfIndex = new Map();
        if (description != undefined) {
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size);
            this.addNode(description);
        }
        if (kinfs != undefined) kinfs.forEach((kinf)=>{
            this.kinfIndex.set(this.nodes.size, this.nodes.size);
            this.addNode(kinf);
        });
    }
    /**
     * @returns The Description node or undefined if it does not exist.
     */ getDescription() {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param description The Description node.
     */ setDescription(description) {
        let i = this.index.get((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
        if (i == undefined) {
            this.index.set((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName, this.nodes.size);
            this.addNode(description);
        } else this.nodes.set(i, description);
    }
    /**
     * @returns The Kinf nodes.
     */ getKinfs() {
        return Array.from(this.kinfIndex.values()).map((index)=>this.nodes.get(index));
    }
    /**
     * @param kinf The Kinf node.
     */ addKinf(kinf) {
        this.kinfIndex.set(this.kinfIndex.size, this.nodes.size);
        this.addNode(kinf);
    }
    /**
     * @returns The CanonicalRateList as a CSV string.
     */ toCSV() {
        let csv = "";
        let first = true;
        this.getKinfs().forEach((k)=>{
            if (first) {
                first = false;
                csv += k.getHeader().join(",") + "\n";
            }
            csv += k.toCSV() + "\n";
        });
        return csv;
    }
}
class $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb extends (0, $cc8c7201a9bad777$export$bd431b64ad3b0433) {
    static{
        /**
     * The tag name.
     */ this.tagName = "reaction";
    }
    static{
        /**
     * The key to the id attribute value.
     */ this.s_id = "id";
    }
    /**
     * @param attributes The attributes.
     * @param id The id of the reaction.
     * @param reactants The reactants in the reaction.
     * @param products The products of the reaction.
     * @param tunneling The tunneling (optional).
     * @param transitionStates The transition states (optional).
     * @param mCRCMethod The MCRCMethod (optional).
     * @param excessReactantConc The excess reactant concentration (optional).
     * @param canonicalRateList The canonical rate list (optional).
     */ constructor(attributes, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc, canonicalRateList){
        super(attributes, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id = attributes.get($28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb.s_id);
        if (id == undefined) throw new Error($28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb.s_id + " is undefined!");
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach((reactant)=>{
                this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
                this.addNode(reactant);
            });
            this.index.set($28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach((product)=>{
                this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
                this.addNode(product);
            });
            this.index.set($28e4a0fe6fb3e45e$export$264ad599d7cef668.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach((transitionState)=>{
                this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
                this.addNode(transitionState);
            });
            this.index.set($28e4a0fe6fb3e45e$export$145c1ed87b1a2216.tagName, this.transitionStatesIndex);
        }
        if (mCRCMethod != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$6fa70ee10f356b6.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        }
        if (excessReactantConc != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$284227145ed02b04.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        }
        if (canonicalRateList != undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$3f85289af9546f7e.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
        }
    }
    /**
     * Add a node to the index.
     */ addToIndex(tagName, node) {
        let v = this.index.get(tagName);
        if (v == undefined) this.index.set(tagName, this.nodes.size);
        else if (v instanceof Map) v.set(node.tagName, this.nodes.size);
        else {
            let map = new Map();
            map.set(this.nodes.get(v).getRef(), v);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The reactants.
     */ getReactants() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the reactants.
     */ setReactants(reactants) {
        reactants.forEach((reactant)=>{
            this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
            this.addNode(reactant);
        });
        this.index.set($28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6.tagName, this.reactantsIndex);
    }
    /**
     * @returns A particular Reactant.
     * @param ref The ref of the reactant to return.
     * @returns The reactant at the given index.
     */ getReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param reactant The reactant to add.
     */ addReactant(reactant) {
        this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
        this.addNode(reactant);
    }
    /**
     * @param ref The ref of the reactant to remove.
     */ removeReactant(ref) {
        let index = this.reactantsIndex.get(ref);
        if (index == undefined) throw new Error(`Reactant with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.reactantsIndex.delete(ref);
        }
    }
    /**
     * @returns The products.
     */ getProducts() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$264ad599d7cef668.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the products.
     */ setProducts(products) {
        products.forEach((product)=>{
            this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
            this.addNode(product);
        });
        this.index.set($28e4a0fe6fb3e45e$export$264ad599d7cef668.tagName, this.productsIndex);
    }
    /**
     * @returns A particular Product.
     * @param ref The ref of the product to return.
     * @returns The product at the given index.
     */ getProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param product The product to add.
     */ addProduct(product) {
        this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
        this.addNode(product);
    }
    /**
     * @param ref The ref of the product to remove.
     */ removeProduct(ref) {
        let index = this.productsIndex.get(ref);
        if (index == undefined) throw new Error(`Product with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.productsIndex.delete(ref);
        }
    }
    /**
     * @returns The tunneling node or undefined if it does not exist.
     */ getTunneling() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the tunneling node or create it if it is undefined.
     */ setTunneling(tunneling) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$c3cf6f96dac11421.tagName, this.nodes.size);
            this.addNode(tunneling);
        } else {
            if (i instanceof Map) throw new Error("Tunneling is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, tunneling);
        }
    }
    /**
     * @returns The transition states.
     */ getTransitionStates() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$145c1ed87b1a2216.tagName);
        if (i == undefined) return [];
        if (i instanceof Map) return Array.from(i.values()).map((index)=>this.nodes.get(index));
        else return [
            this.nodes.get(i)
        ];
    }
    /**
     * Set the transition states.
     */ setTransitionStates(transitionStates) {
        transitionStates.forEach((transitionState)=>{
            this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
            this.addNode(transitionState);
        });
        this.index.set($28e4a0fe6fb3e45e$export$145c1ed87b1a2216.tagName, this.transitionStatesIndex);
    }
    /**
     * @returns A particular TransitionState.
     * @param ref The ref of the transition state to return.
     * @returns The transition state at the given index.
     */ getTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition state with ref ${ref} not found`);
        return this.nodes.get(index);
    }
    /**
     * @param transitionState The transition state to add.
     */ addTransitionState(transitionState) {
        this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
        this.addNode(transitionState);
    }
    /**
     * @param ref The ref of the transition state to remove.
     */ removeTransitionState(ref) {
        let index = this.transitionStatesIndex.get(ref);
        if (index == undefined) throw new Error(`Transition State with ref ${ref} not found`);
        else {
            this.nodes.delete(index);
            this.transitionStatesIndex.delete(ref);
        }
    }
    /**
     * @returns The MCRCMethod node or undefined if it does not exist.
     */ getMCRCMethod() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$6fa70ee10f356b6.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the MCRCMethod node or create it if it is undefined.
     */ setMCRCMethod(mCRCMethod) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$6fa70ee10f356b6.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$6fa70ee10f356b6.tagName, this.nodes.size);
            this.addNode(mCRCMethod);
        } else {
            if (i instanceof Map) throw new Error("MCRCMethod is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, mCRCMethod);
        }
    }
    /**
     * @returns The excess reactant concentration or undefined if it does not exist.
     */ getExcessReactantConc() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$284227145ed02b04.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the excess reactant concentration or create it if it is undefined.
     */ setExcessReactantConc(excessReactantConc) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$284227145ed02b04.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$284227145ed02b04.tagName, this.nodes.size);
            this.addNode(excessReactantConc);
        } else {
            if (i instanceof Map) throw new Error("ExcessReactantConc is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, excessReactantConc);
        }
    }
    /**
     * @returns The canonical rate list or undefined if it does not exist.
     */ getCanonicalRateList() {
        let i = this.index.get($28e4a0fe6fb3e45e$export$3f85289af9546f7e.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the canonical rate list or create it if it is undefined.
     */ setCanonicalRateList(canonicalRateList) {
        let i = this.index.get($28e4a0fe6fb3e45e$export$3f85289af9546f7e.tagName);
        if (i == undefined) {
            this.index.set($28e4a0fe6fb3e45e$export$3f85289af9546f7e.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
        } else {
            if (i instanceof Map) throw new Error("CanonicalRateList is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, canonicalRateList);
        }
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return this.getReactants().map((reactant)=>reactant.getMolecule().getRef()).join(" + ");
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        return this.getProducts().map((product)=>product.getMolecule().getRef()).join(" + ");
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.getReactantsLabel() + " -> " + this.getProductsLabel();
        return label;
    }
    /**
     * Returns the total energy of all reactants.
     * @returns The total energy of all reactants.
     */ getReactantsEnergy(retrieveMolecule, molecules) {
        // Sum up the energy values of all the reactants in the reaction
        return Array.from(this.getReactants()).map((reactant)=>{
            let ref = reactant.getMolecule().getRef();
            console.log('ref="' + ref + '"');
            let molecule = retrieveMolecule(reactant.getMolecule().getRef(), molecules);
            if (molecule == undefined) throw new Error(`Molecule with ref ${reactant.getMolecule().getRef()} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a.add(b), new (0, $a227f0f1258db640$exports.Big)(0));
    }
    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */ getProductsEnergy(retrieveMolecule, molecules) {
        // Sum up the energy values of all the products in the reaction
        return Array.from(this.getProducts()).map((product)=>{
            let molecule = retrieveMolecule(product.getMolecule().getRef(), molecules);
            if (molecule == undefined) throw new Error(`Molecule with ref ${product.getMolecule().getRef()} not found`);
            return molecule.getEnergy();
        }).reduce((a, b)=>a.add(b), new (0, $a227f0f1258db640$exports.Big)(0));
    }
    /**
     * @param tagName The tag name.
     * @param dictRef The dictRef.
     * @returns The node with the tag name and dictRef or undefined if it does not exist.
     */ get(tagName, dictRef) {
        if (this.index.has(tagName)) {
            let i = this.index.get(tagName);
            if (i != undefined) {
                if (i instanceof Map) {
                    let nodeIndex = i.get(dictRef);
                    if (nodeIndex != undefined) return this.nodes.get(nodeIndex);
                } else return this.nodes.get(i);
            }
        }
    }
}




function $cbb1ac0a822ffab5$export$b12ef0e3d99deb64(rlDiv, reactions, molecules) {
    let rb = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$39c84188a71202f7));
    rlDiv.appendChild(rb);
    rb.addEventListener("click", ()=>{
        let reactionAttributes = new Map();
        reactionAttributes.set((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).s_id, "R" + reactions.size);
        let r = new (0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb)(reactionAttributes);
        reactions.set(r.id, r);
        let rDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName, r.id);
        let rDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(rDivID);
        rlDiv.appendChild(rDiv);
        // Create collapsible content.
        let rcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(rDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let rcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rcDivID, rlDiv, rb, rDiv, r.getLabel(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Create a selector to select a molecule as a reactant.
        let selectReactant = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $7e68913db756e51f$export$5ac38056c0103baa)(molecules), "select", "", (0, $7e68913db756e51f$export$bea69a603fae01a6)(rcDivID, (0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).tagName, (0, $f0396edd0a5c99f7$export$8797b0c8298d191)), (0, $7e68913db756e51f$export$39c84188a71202f7));
        rcDiv.appendChild(selectReactant);
    });
    return rb;
}
function $cbb1ac0a822ffab5$export$ef4959ac45646090(xml, reactions) {
    // Create div to contain the reaction list.
    let reactionListDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $69ecbdaa96f3962d$export$44466a39ca846289).tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function(node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size != 1) {
        if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text"))) {
            console.error("reactionListTagNames:");
            reactionListTagNames.forEach((x)=>console.error(x));
            throw new Error("Additional tag names in reactionList:");
        }
    }
    if (!reactionListTagNames.has((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName)) throw new Error('Expecting tags with "' + (0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName + '" tagName but there are none!');
    // Process the XML "reaction" elements.
    let xml_reactions = xml_reactionList.getElementsByTagName((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName);
    let xml_reactions_length = xml_reactions.length;
    console.log("Number of reactions=" + xml_reactions_length);
    //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_reactions.length; i++){
        // Set attributes.
        let reactionAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactions[i]);
        // Create reaction.
        let reaction = new (0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb)(reactionAttributes);
        reactions.set(reaction.id, reaction);
        let reactionTagNames = new Set();
        let cns = xml_reactions[i].childNodes;
        // Create a new div for the reaction.
        let reactionDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $28e4a0fe6fb3e45e$export$d2ae4167a30cf6bb).tagName, i);
        let reactionDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(reactionDivID);
        //console.log("cns.length=" + cns.length);
        //cns.forEach(function (cn) {
        for(let j = 0; j < cns.length; j++){
            let cn = cns[j];
            // Check for nodeName repeats that are not #text.
            if (!reactionTagNames.has(cn.nodeName)) reactionTagNames.add(cn.nodeName);
            else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
            if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
        //console.log(cn.nodeName);
        }
        // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
        // Load reactants.
        let xml_reactants = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).tagName);
        reactionTagNames.delete((0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).tagName);
        //console.log("xml_reactants.length=" + xml_reactants.length);
        if (xml_reactants.length > 0) {
            // Create a new collapsible div for the reactants.
            let rsDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).tagName);
            let rsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(rsDivID);
            let rscDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(rsDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let rscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rscDivID, reactionDiv, null, rsDiv, "Reactants", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let reactants = [];
            for(let j = 0; j < xml_reactants.length; j++){
                let reactantDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(rsDivID, (0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).tagName, j);
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_reactants[j], (0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $28e4a0fe6fb3e45e$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let reactant = new (0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_reactants[j]), molecule);
                reactants.push(reactant);
                // Create a new div for the role.
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(molecule.getRef() + " role", (0, $28e4a0fe6fb3e45e$export$dcfd4302d04b7fb6).roleOptions, "Role", molecule.getRole(), (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactantDivID, (0, $f0396edd0a5c99f7$export$8797b0c8298d191)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                lws.querySelector("select")?.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                rsDiv.appendChild(lws);
            }
            reaction.setReactants(reactants);
        }
        // Load products.
        let xml_products = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$264ad599d7cef668).tagName);
        reactionTagNames.delete((0, $28e4a0fe6fb3e45e$export$264ad599d7cef668).tagName);
        //console.log("xml_products.length=" + xml_products.length);
        if (xml_products.length > 0) {
            // Create collapsible div for the products.
            let psDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$264ad599d7cef668).tagName);
            let psDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(psDivID);
            let pscDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(psDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let pscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(pscDivID, reactionDiv, null, psDiv, "Products", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let products = [];
            for(let j = 0; j < xml_products.length; j++){
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_products[j], (0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $28e4a0fe6fb3e45e$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let product = new (0, $28e4a0fe6fb3e45e$export$264ad599d7cef668)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_products[j]), molecule);
                products.push(product);
                let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(molecule.getRef() + " role", (0, $28e4a0fe6fb3e45e$export$264ad599d7cef668).roleOptions, molecule.getRole(), molecule.getRef(), (0, $7e68913db756e51f$export$bea69a603fae01a6)(psDivID, j, "Role"), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                let select = lws.querySelector("select");
                select.value = molecule.getRole();
                select.addEventListener("change", (event)=>{
                    let target = event.target;
                    molecule.setRole(target.value);
                    console.log("Set Role to " + target.value);
                    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
                });
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
                psDiv.appendChild(lws);
            }
            reaction.setProducts(products);
        }
        // Create a new collapsible div for the reaction.
        let reactioncDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let reactioncDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(reactioncDivID, reactionListDiv, null, reactionDiv, reaction.id + " (" + reaction.getLabel() + ")", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Load tunneling.
        let xml_tunneling = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421).tagName);
        if (xml_tunneling.length > 0) {
            if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421).tagName + " but finding " + xml_tunneling.length + "!");
            let tunneling = new (0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tunneling[0]));
            reaction.setTunneling(tunneling);
            let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)((0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421).tagName, (0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421).options, "Tunneling", tunneling.getName(), (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$c3cf6f96dac11421).tagName), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            lws.querySelector("select")?.addEventListener("change", (event)=>{
                let target = event.target;
                tunneling.setName(target.value);
                console.log("Set Tunneling to " + target.value);
                (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
            });
            reactionDiv.appendChild(lws);
        }
        // Load transition states.
        let xml_transitionStates = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$145c1ed87b1a2216).tagName);
        //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
        if (xml_transitionStates.length > 0) {
            // Create collapsible div.
            let tsDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$145c1ed87b1a2216).tagName);
            let tsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(tsDivID);
            let tscDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(tsDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let tscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(tscDivID, reactionDiv, null, tsDiv, "Transition States", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            let transitionStates = [];
            for(let j = 0; j < xml_transitionStates.length; j++){
                let xml_molecule = (0, $cc8c7201a9bad777$export$91e73a91db22e6a2)(xml_transitionStates[j], (0, $01410cda1eef5011$export$3da9759ad07746a3).tagName);
                let molecule = new (0, $28e4a0fe6fb3e45e$export$e8a062bb2fc9e2ba)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_molecule));
                let transitionState = new (0, $28e4a0fe6fb3e45e$export$145c1ed87b1a2216)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_transitionStates[j]), molecule);
                transitionStates.push(transitionState);
                // Create a label for the Transition State.
                let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(molecule.getRef() + " role transitionState", (0, $7e68913db756e51f$export$39c84188a71202f7));
                tsDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
        }
        // Load MCRCMethod.
        //console.log("Load MCRCMethod...");
        let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6).tagName);
        //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
        //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
        if (xml_MCRCMethod.length > 0) {
            if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6).tagName + " but finding " + xml_MCRCMethod.length + "!");
            else {
                let mm;
                let mmAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_MCRCMethod[0]);
                let type = mmAttributes.get("xsi:type");
                if (type == undefined) // If there is no xsi:type search for a name.
                type = mmAttributes.get("name");
                let mmDivId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6).tagName);
                let mmDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mmDivId);
                if (type == (0, $28e4a0fe6fb3e45e$export$191e95ebb11cc88).xsiType || type == (0, $28e4a0fe6fb3e45e$export$191e95ebb11cc88).xsiType2) {
                    // Create a collapsible div.
                    let mmcDivId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $7e68913db756e51f$export$7295f538b9762c5));
                    let mmcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mmcDivId, reactionDiv, null, mmDiv, (0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
                    reactionDiv.appendChild(mmcDiv);
                    //console.log(MCRCMethod.tagName + " name=" + name);
                    mm = new (0, $28e4a0fe6fb3e45e$export$191e95ebb11cc88)(mmAttributes);
                    //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                    let xml_pe = xml_MCRCMethod[0].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName);
                    if (xml_pe != null) {
                        if (xml_pe[0] != null) {
                            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_pe[0]);
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                            let peAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pe[0]);
                            let pe = new (0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85)(peAttributes, value);
                            mm.setPreExponential(pe);
                            // Create a new div element for the input.
                            let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                                let target = event.target;
                                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(pe, target);
                            }, inputString, (0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName);
                            mmDiv.appendChild(lwi);
                            let input = lwi.querySelector("input");
                            input.value = inputString;
                            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            input.addEventListener("change", (event)=>{
                                let target = event.target;
                                inputString = target.value;
                                pe.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                                console.log((0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName + " changed to " + inputString);
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            });
                            (0, $7e68913db756e51f$export$2b2254f82abcc900)(undefined, peAttributes, lwi, null, (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName), (0, $28e4a0fe6fb3e45e$export$38ce90ac8b004d85).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                            mmDiv.appendChild(lwi);
                        }
                    }
                    //console.log("preExponential " + preExponential);
                    let xml_ae = xml_MCRCMethod[0].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName);
                    if (xml_ae != null) {
                        if (xml_ae[0] != null) {
                            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_ae[0]);
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                            let aeAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ae[0]);
                            let ae = new (0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d)(aeAttributes, value);
                            mm.setActivationEnergy(ae);
                            // Create a new div element for the input.
                            let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                                let target = event.target;
                                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(ae, target);
                            }, inputString, (0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName);
                            let input = lwi.querySelector("input");
                            input.value = inputString;
                            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            input.addEventListener("change", (event)=>{
                                let target = event.target;
                                inputString = target.value;
                                ae.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                                console.log((0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName + " changed to " + inputString);
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            });
                            (0, $7e68913db756e51f$export$2b2254f82abcc900)(undefined, aeAttributes, lwi, null, (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName), (0, $28e4a0fe6fb3e45e$export$1bdc69d2439d749d).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                            mmDiv.appendChild(lwi);
                        }
                    }
                    //console.log("activationEnergy " + activationEnergy);
                    let xml_ti = xml_MCRCMethod[0].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName);
                    if (xml_ti != null) {
                        if (xml_ti[0] != null) {
                            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_ti[0]);
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                            let tiAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ti[0]);
                            let ti = new (0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c)(tiAttributes, value);
                            mm.setTInfinity(ti);
                            // Create a new div element for the input.
                            let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                                let target = event.target;
                                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(ti, target);
                            }, inputString, (0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName);
                            let input = lwi.querySelector("input");
                            input.value = inputString;
                            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            input.addEventListener("change", (event)=>{
                                let target = event.target;
                                inputString = target.value;
                                ti.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                                console.log((0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName + " changed to " + inputString);
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
                            });
                            (0, $7e68913db756e51f$export$2b2254f82abcc900)(undefined, tiAttributes, lwi, null, (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName), (0, $28e4a0fe6fb3e45e$export$8d95dd32819bc86c).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                            mmDiv.appendChild(lwi);
                        }
                    }
                    //console.log("tInfinity " + tInfinity);
                    let xml_ni = xml_MCRCMethod[0].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName);
                    if (xml_ni != null) {
                        if (xml_ni[0] != null) {
                            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(xml_ni[0]);
                            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                            let niAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ni[0]);
                            let ni = new (0, $28e4a0fe6fb3e45e$export$d08982dd841d496f)(niAttributes, value);
                            mm.setNInfinity(ni);
                            // Create a new div element for the input.
                            let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                                let target = event.target;
                                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(ni, target);
                            }, inputString, (0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName);
                            mmDiv.appendChild(lwi);
                            let inputElement = lwi.querySelector("input");
                            inputElement.value = inputString;
                            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                            inputElement.addEventListener("change", (event)=>{
                                let target = event.target;
                                inputString = target.value;
                                ni.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
                                console.log((0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName + " set to " + inputString);
                                (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(inputElement);
                            });
                            (0, $7e68913db756e51f$export$2b2254f82abcc900)(undefined, niAttributes, lwi, null, (0, $7e68913db756e51f$export$bea69a603fae01a6)(mmDivId, (0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName), (0, $28e4a0fe6fb3e45e$export$d08982dd841d496f).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                            mmDiv.appendChild(lwi);
                        }
                    }
                } else {
                    mm = new (0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6)(mmAttributes);
                    let mCRCMethodLabel = document.createElement("label");
                    mCRCMethodLabel.textContent = (0, $28e4a0fe6fb3e45e$export$6fa70ee10f356b6).tagName + ": " + type;
                    Object.assign(mCRCMethodLabel.style, (0, $7e68913db756e51f$export$39c84188a71202f7));
                    mmDiv.appendChild(mCRCMethodLabel);
                    reactionDiv.appendChild(mmDiv);
                }
                reaction.setMCRCMethod(mm);
            }
        }
        // me:excessReactantConc
        let xml_erc = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$284227145ed02b04).tagName);
        //console.log("n_me:excessReactantConc=" + xml_erc.length);
        if (xml_erc.length > 0) {
            if (xml_erc.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$284227145ed02b04).tagName + " but finding " + xml_erc.length + "!");
            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_erc[0])));
            let erc = new (0, $28e4a0fe6fb3e45e$export$284227145ed02b04)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_erc[0]), value);
            reaction.setExcessReactantConc(erc);
            let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$284227145ed02b04).tagName);
            let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7), (event)=>{
                let target = event.target;
                (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(erc, target);
            }, value.toExponential(), (0, $28e4a0fe6fb3e45e$export$284227145ed02b04).tagName);
            reactionDiv.appendChild(lwi);
        }
        // me:canonicalRateList
        let xml_crl = xml_reactions[i].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e).tagName);
        //console.log("n_me:canonicalRateList=" + xml_crl.length);
        if (xml_crl.length > 0) {
            if (xml_crl.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e).tagName + " but finding " + xml_crl.length + "!");
            let clr_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_crl[0]);
            let crl = new (0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e)(clr_attributes);
            reaction.setCanonicalRateList(crl);
            // Create a new collapsible div for the canonicalRateList.
            let crlDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(reactionDivID, (0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e).tagName);
            let crlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(crlDivID);
            let crlcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(crlDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
            let crlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(crlcDivID, reactionDiv, null, crlDiv, (0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
            reactionDiv.appendChild(crlcDiv);
            //let id = addID(reaction.id, CanonicalRateList.tagName);
            // me:description.
            let xml_d = xml_crl[0].getElementsByTagName((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
            //console.log("xml_d.length=" + xml_d.length);
            if (xml_d.length > 0) {
                if (xml_d.length > 1) throw new Error("Expecting 1 " + (0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName + " but finding " + xml_d.length + "!");
                let description = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_d[0]));
                //console.log("description=" + description);
                crl.setDescription(new (0, $69ecbdaa96f3962d$export$393edc798c47379d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_d[0]), description));
                let l = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(description + " (" + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(clr_attributes) + ")", (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
                let ldiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
                ldiv.appendChild(l);
                crlDiv.appendChild(ldiv);
            }
            // me:kinf.
            let xml_k = xml_crl[0].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$5eb02c9a0d4a6c5).tagName);
            //console.log("xml_k.length=" + xml_k.length);
            if (xml_k.length > 0) {
                // Create a table for the kinf.
                let t = (0, $f0396edd0a5c99f7$export$33bbb3ec7652e187)((0, $7e68913db756e51f$export$bea69a603fae01a6)(crlDivID, (0, $28e4a0fe6fb3e45e$export$5eb02c9a0d4a6c5).tagName, (0, $7e68913db756e51f$export$7a850709da5c4f5b)), (0, $7e68913db756e51f$export$39c84188a71202f7));
                crlDiv.appendChild(t);
                for(let j = 0; j < xml_k.length; j++){
                    let k = new (0, $28e4a0fe6fb3e45e$export$5eb02c9a0d4a6c5)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_k[j]));
                    crl.addKinf(k);
                    // T.
                    let xml_T = xml_k[j].getElementsByTagName((0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName);
                    //console.log("xml_T.length=" + xml_T.length);
                    if (xml_T.length > 0) {
                        if (xml_T.length > 1) throw new Error("Expecting 1 " + (0, $69ecbdaa96f3962d$export$971d5caa766a69d7).tagName + " but finding " + xml_T.length + "!");
                        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_T[0])));
                        k.setT(new (0, $69ecbdaa96f3962d$export$971d5caa766a69d7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_T[0]), value));
                    }
                    // Val.
                    let xml_Val = xml_k[j].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$38dfac6a73b2b45e).tagName);
                    //console.log("xml_Val.length=" + xml_Val.length);
                    if (xml_Val.length > 0) {
                        if (xml_Val.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$38dfac6a73b2b45e).tagName + " but finding " + xml_Val.length + "!");
                        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_Val[0])));
                        k.setVal(new (0, $28e4a0fe6fb3e45e$export$38dfac6a73b2b45e)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Val[0]), value));
                    }
                    // Rev.
                    let xml_Rev = xml_k[j].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$a292f79afb9ad235).tagName);
                    //console.log("xml_Rev.length=" + xml_Rev.length);
                    if (xml_Rev.length > 0) {
                        if (xml_Rev.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$a292f79afb9ad235).tagName + " but finding " + xml_Rev.length + "!");
                        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_Rev[0])));
                        k.setRev(new (0, $28e4a0fe6fb3e45e$export$a292f79afb9ad235)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Rev[0]), value));
                    }
                    // Keq.
                    let xml_Keq = xml_k[j].getElementsByTagName((0, $28e4a0fe6fb3e45e$export$835b53a514d067b0).tagName);
                    //console.log("xml_Keq.length=" + xml_Keq.length);
                    if (xml_Keq.length > 0) {
                        if (xml_Keq.length > 1) throw new Error("Expecting 1 " + (0, $28e4a0fe6fb3e45e$export$835b53a514d067b0).tagName + " but finding " + xml_Keq.length + "!");
                        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_Keq[0])));
                        k.setKeq(new (0, $28e4a0fe6fb3e45e$export$835b53a514d067b0)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_Keq[0]), value));
                    }
                    if (j == 0) // It maybe that only the first kinf contains unit details!
                    (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, k.getHeader());
                    (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(t, k.toStringArray());
                }
                (0, $7e68913db756e51f$export$dd526fb3a2a9c049)(crl.toCSV.bind(crl), crlDiv, t, reaction.id + "_" + (0, $28e4a0fe6fb3e45e$export$3f85289af9546f7e).tagName, (0, $7e68913db756e51f$export$39c84188a71202f7));
            }
        }
    }
    return reactionListDiv;
}









function $589572943861997b$export$120facc5efd57974(xml, conditionsIDs, molecules) {
    console.log((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName);
    // Create a div for the conditionss.
    let conditionssDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName);
    for(let i = 0; i < xml_conditionss.length; i++){
        let xml_conditions = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName, i.toString());
        let cDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(cDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        let ccDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(cDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let ccDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ccDivID, conditionssDiv, null, cDiv, (0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        let conditions = $589572943861997b$var$addConditions((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_conditions), i);
        $589572943861997b$var$handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        $589572943861997b$var$handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(cDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeConditions.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the conditions.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a conditions.
    $589572943861997b$var$createAddConditionsButton(conditionssDiv, conditionsIDs, molecules);
    return conditionssDiv;
}
/**
 * @param conditions The conditions.
 * @param cDiv The conditions div.
 * @param conditionsIndex The conditions index.
 * @param xml_conditions The XML conditions.
 */ function $589572943861997b$var$handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
    let bsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(bsDivID);
    let bscDivID = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, (0, $7e68913db756e51f$export$7295f538b9762c5));
    let bscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(bscDivID, cDiv, null, bsDiv, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
    // Add add button.
    let addBathGasButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$39c84188a71202f7));
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener("click", ()=>{
        let bathGas = new (0, $754b7c8446bbe616$export$b33a132661f4be58)(new Map(), (0, $7e68913db756e51f$export$d8b8827abc8ab7e7));
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
        let id = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, bathGasIndex.toString());
        let select = $589572943861997b$var$createSelectElementBathGas(Array.from((0, $7e68913db756e51f$export$5ac38056c0103baa)(molecules)), bathGas, true, id);
        select.classList.add((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
        div.appendChild(select);
        (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(div, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (bathGas)=>{
            bsDiv.removeChild(div);
            conditionsIDs.removeID(id), conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases = Array.from(xml_conditions.children).filter((child)=>child.tagName === (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
        if (xml_bathGases.length > 0) for(let i = 0; i < xml_bathGases.length; i++){
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGases[i]);
            let moleculeID = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGases[i]));
            let bathGas = new (0, $754b7c8446bbe616$export$b33a132661f4be58)(attributes, moleculeID);
            //console.log("bathGas " + bathGas.toString());
            let bathGasIndex = conditions.addBathGas(bathGas);
            let id = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, bathGasIndex.toString());
            let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, (0, $7e68913db756e51f$export$39c84188a71202f7));
            div.appendChild($589572943861997b$var$createSelectElementBathGas(Array.from((0, $7e68913db756e51f$export$5ac38056c0103baa)(molecules)), bathGas, false, id));
            (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(div, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (bathGas)=>{
                bsDiv.removeChild(div);
                conditionsIDs.removeID(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
        else {
            let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
            let id = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, 0);
            div.appendChild($589572943861997b$var$createSelectElementBathGas(Array.from((0, $7e68913db756e51f$export$5ac38056c0103baa)(molecules)), undefined, false, id));
            (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(div, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (bathGas)=>{
                bsDiv.removeChild(div);
                conditionsIDs.removeID(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
    }
}
/**
 * 
 * @param conditions 
 * @param cDiv
 * @param xml_conditions 
 * @param level 
 * @param nextLevel 
 */ function $589572943861997b$var$handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // PTs
    let moleculeKeys = (0, $7e68913db756e51f$export$5ac38056c0103baa)(molecules);
    // Create collapsible div.
    let pTsDivId = conditionsIDs.addID(cDiv.id, (0, $754b7c8446bbe616$export$3be0efe793283834).tagName);
    let pTsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(pTsDivId);
    let pTscDivId = conditionsIDs.addID(cDiv.id, pTsDivId, (0, $7e68913db756e51f$export$7295f538b9762c5));
    let pTscDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(pTscDivId, cDiv, null, pTsDiv, (0, $754b7c8446bbe616$export$3be0efe793283834).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
    let pTs;
    if (xml_conditions) {
        let xml_PTss = xml_conditions.getElementsByTagName((0, $754b7c8446bbe616$export$3be0efe793283834).tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, $754b7c8446bbe616$export$3be0efe793283834).tagName + " but finding " + xml_PTss.length + "!");
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTss[0]);
            let xml_PTpairs = xml_PTss[0].getElementsByTagName((0, $754b7c8446bbe616$export$3fe97ecb6b172244).tagName);
            if (xml_PTpairs.length == 0) throw new Error("Expecting 1 or more " + (0, $754b7c8446bbe616$export$3fe97ecb6b172244).tagName + " but finding 0!");
            else {
                pTs = new (0, $754b7c8446bbe616$export$3be0efe793283834)(attributes);
                for(let i = 0; i < xml_PTpairs.length; i++){
                    let pTpairAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_PTpairs[i]);
                    //console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new (0, $754b7c8446bbe616$export$3fe97ecb6b172244)(pTpairAttributes);
                    pTs.add(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        pTpair.setBathGas(new (0, $754b7c8446bbe616$export$b33a132661f4be58)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_bathGass[0]), (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers = xml_PTpairs[i].getElementsByTagName((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) console.warn("xml_experimentRates.length=" + xml_ers.length);
                        pTpair.setExperimentalRate(new (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ers[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys = xml_PTpairs[i].getElementsByTagName((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        pTpair.setExperimentalYield(new (0, $754b7c8446bbe616$export$c291f4faacd745a6)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_eys[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees = xml_PTpairs[i].getElementsByTagName((0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        pTpair.setExperimentalEigenvalue(new (0, $754b7c8446bbe616$export$ed9dfbc127680fd1)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ees[0]), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.appendChild($589572943861997b$var$createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, i, moleculeKeys, (0, $7e68913db756e51f$export$39c84188a71202f7)));
                }
            }
        } else pTs = new (0, $754b7c8446bbe616$export$3be0efe793283834)(new Map());
    } else pTs = new (0, $754b7c8446bbe616$export$3be0efe793283834)(new Map());
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener("click", ()=>{
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new (0, $754b7c8446bbe616$export$3fe97ecb6b172244)(pTpairAttributes);
        let pTpairIndex = pTs.add(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore($589572943861997b$var$createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, (0, $7e68913db756e51f$export$39c84188a71202f7)), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$3e0cc820631ca658), undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener("click", ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
        let addFromSpreadsheetId = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $754b7c8446bbe616$export$3be0efe793283834).tagName, "addFromSpreadsheet");
        let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", addFromSpreadsheetId, (0, $7e68913db756e51f$export$39c84188a71202f7));
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener("change", ()=>{
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray = input.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("	").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for(let i = 1; i < pTpairsArray.length; i++){
                    let pTpairArray = pTpairsArray[i].split("	");
                    let pIndex = index.get("P");
                    let p = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new (0, $754b7c8446bbe616$export$3fe97ecb6b172244)(pTpairAttributes);
                    pTs.add(pTpair);
                    let tIndex = index.get("T");
                    let t = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc)) {
                        let excessReactantConIndex = index.get((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex = index.get((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision, precision);
                    //console.log("precision=" + precision);
                    }
                    if (index.has((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName)) {
                        let bathGasIndex = index.get((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new (0, $754b7c8446bbe616$export$b33a132661f4be58)(new Map(), bathGas));
                    }
                    if (index.has((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName)) {
                        let eri = index.get((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName);
                        let er = pTpairArray[eri];
                        if (er.length > 0) {
                            pTpairAttributes.set((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName, er);
                            pTpair.setExperimentalRate(new (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b)(new Map(), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(er)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let err1i = index.get((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_ref1);
                            let err1 = pTpairArray[err1i];
                            pTpair.getExperimentalRate()?.setRef1(err1);
                            // ref2.
                            let err2i = index.get((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_ref2);
                            let err2 = pTpairArray[err2i];
                            pTpair.getExperimentalRate()?.setRef2(err2);
                            // refReaction.
                            let errri = index.get((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_refReaction);
                            let errr = pTpairArray[errri];
                            pTpair.getExperimentalRate()?.setRefReaction(errr);
                            // error.
                            let erei = index.get((0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_error);
                            let ere = pTpairArray[erei];
                            pTpair.getExperimentalRate()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(ere));
                        }
                    }
                    if (index.has((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName)) {
                        let eyi = index.get((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName);
                        let ey = pTpairArray[eyi];
                        if (ey.length > 0) {
                            pTpair.setExperimentalYield(new (0, $754b7c8446bbe616$export$c291f4faacd745a6)(new Map(), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(ey)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let eyri = index.get((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_ref);
                            let eyr = pTpairArray[eyri];
                            pTpair.getExperimentalYield()?.setRef(eyr);
                            // yieldTime.
                            let eyyti = index.get((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_yieldTime);
                            let eyyt = pTpairArray[eyyti];
                            pTpair.getExperimentalYield()?.setYieldTime(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(eyyt));
                            // error.
                            let eyei = index.get((0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_error);
                            let eye = pTpairArray[eyei];
                            pTpair.getExperimentalYield()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(eye));
                        }
                    }
                    if (index.has((0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName)) {
                        let eei = index.get((0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName);
                        let ee = pTpairArray[eei];
                        if (ee.length > 0) {
                            pTpair.setExperimentalEigenvalue(new (0, $754b7c8446bbe616$export$ed9dfbc127680fd1)(new Map(), new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(ee)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let eeeidi = index.get((0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName + "_" + (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).s_EigenvalueID);
                            let eeeid = pTpairArray[eeeidi];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(eeeid);
                            // error.
                            let eeei = index.get((0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName + "_" + (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).s_error);
                            let eee = pTpairArray[eeei];
                            pTpair.getExperimentalEigenvalue()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(eee));
                        }
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.ptps.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore($589572943861997b$var$createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, (0, $7e68913db756e51f$export$39c84188a71202f7)), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Remove All", undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener("click", ()=>{
        pTs.clear();
        // Remove all elements before the pTsButtonsDiv.
        let child = pTsDiv.firstChild;
        while(child != null && child != pTsButtonsDiv){
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}
/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */ function $589572943861997b$var$createAddConditionsButton(conditionssDiv, conditionsIDs, molecules) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
    conditionssDiv.appendChild(button);
    button.addEventListener("click", (event)=>{
        let i = (0, $7e68913db756e51f$export$3bb92be1f57fd129).getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName, i.toString());
        let cDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(cDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        let ccDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(cDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName, (i - 1).toString(), (0, $7e68913db756e51f$export$7295f538b9762c5)));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        let ccDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ccDivID, conditionssDiv, elementToInsertBefore, cDiv, (0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Add the conditions
        let conditions = $589572943861997b$var$addConditions(new Map(), i);
        $589572943861997b$var$handleBathGases(conditions, cDiv, null, conditionsIDs, molecules);
        $589572943861997b$var$handlePTs(conditions, cDiv, null, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(cDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeConditions.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the conditions.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new conditions.
 */ function $589572943861997b$var$addConditions(attributes, i) {
    let conditions = new (0, $754b7c8446bbe616$export$363c7374d425f4ad)(attributes, i);
    (0, $7e68913db756e51f$export$3bb92be1f57fd129).addConditions(conditions);
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTsDiv The PTs div.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */ function $589572943861997b$var$createPTpairDiv(pTs, pTsDiv, pTpair, cDivID, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)((0, $7e68913db756e51f$export$bea69a603fae01a6)(pTsDiv.id, pTIndex), level);
    $589572943861997b$var$addPorT(pTpairDiv, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    (0, $7e68913db756e51f$export$2b2254f82abcc900)((0, $69ecbdaa96f3962d$export$692079bb871c6039).pressureUnits, pTpair.attributes, pTpairDiv, null, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).tagName, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
    $589572943861997b$var$addPorT(pTpairDiv, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    //let id: string = conditionsIDs.addID(cDivID, pTsDiv.id, pTIndex.toString());
    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, addID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    $589572943861997b$var$addAttribute(pTpairDiv, pTpair, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc, $589572943861997b$var$createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    $589572943861997b$var$addPercentExcessReactantConc(pTpairDiv, pTpair);
    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, addID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    $589572943861997b$var$addAttribute(pTpairDiv, pTpair, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision, $589572943861997b$var$createPrecisionSelectElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_precision, createPrecisionSelectElement,
    //    (pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // BathGas.
    //addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, addID(id, BathGas.tagName),
    //    [pTpair, moleculeKeys, true], createBathGasSelectElement);
    $589572943861997b$var$addBathGas(pTpairDiv, pTpair, moleculeKeys);
    /*
    addAttribute(pTpairDiv, pTpair, pTIndex, BathGas.tagName, createBathGasSelectElement,
        (pTpair, attribute) => pTpair.getBathGas() !== undefined,  (pTpair, attribute) => pTpair.getBathGas(), moleculeKeys
    );
    */ // ExperimentalRate.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, addID(id, ExperimentalRate.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    //addExperimentalRate(pTpairDiv, pTpair, pTIndex);
    $589572943861997b$var$addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName, (pTpair)=>pTpair.getExperimentalRate(), $589572943861997b$var$createExperimentalRateDetails);
    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, addID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    $589572943861997b$var$addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName, (pTpair)=>pTpair.getExperimentalYield(), $589572943861997b$var$createExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, addID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    $589572943861997b$var$addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName, (pTpair)=>pTpair.getExperimentalEigenvalue(), $589572943861997b$var$createExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair)=>{
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) pTs.remove(i);
        pTpair.removeBathGas();
    };
    (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(pTpairDiv, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */ function $589572943861997b$var$addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", (0, $754b7c8446bbe616$export$3fe97ecb6b172244).tagName + "_" + name, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
        let target = event.target;
        try {
            setter(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
            console.log(`Set ${name} to ${target.value}`);
        } catch (e) {
            alert("Invalid input, resetting...");
            input.value = $589572943861997b$var$getValue(getter);
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, $589572943861997b$var$getValue(getter), name);
    let input = lwi.querySelector("input");
    input.value = $589572943861997b$var$getValue(getter);
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    pTpairDiv.appendChild(lwi);
}
function $589572943861997b$var$getValue(getter) {
    let value = getter();
    if (value !== undefined) return value.toString();
    else return "";
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 */ function $589572943861997b$var$addPercentExcessReactantConc(pTpairDiv, pTpair) {
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(pTpairDiv.id, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_percentExcessReactantConc);
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTpairDiv.appendChild(div);
    let attribute = (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_percentExcessReactantConc;
    let buttonTextContentSelected = attribute + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = attribute + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 * @param attribute The attribute.
 * @param createInputElement The function to create the input element.
 */ function $589572943861997b$var$addAttribute(pTpairDiv, pTpair, attribute, createInputElement) {
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(pTpairDiv.id, attribute);
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = attribute + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = attribute + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let iid = (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(iid);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */ function $589572943861997b$var$addBathGas(pTpairDiv, pTpair, moleculeKeys) {
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(pTpairDiv.id, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTpairDiv.appendChild(div);
    let tagName = (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName;
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let iid = (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    let bathGas = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) console.warn("moleculeKeys does not contain " + bathGas.value);
        div.appendChild($589572943861997b$var$createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild($589572943861997b$var$createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(iid);
        }
    });
}
/**
 * 
 * @param pTpairDiv 
 * @param pTpair 
 * @param conditionsIndex 
 * @param pTIndex 
 * @param tagName 
 * @param getAttribute 
 * @param createElement 
 */ function $589572943861997b$var$addExperimentalElement(pTpairDiv, pTpair, pTIndex, tagName, getAttribute, createElement) {
    let id = (0, $7e68913db756e51f$export$bea69a603fae01a6)(pTpairDiv.id, tagName);
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let iid = (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(iid);
        }
    });
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */ function $589572943861997b$var$createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision)) value = pTpair.attributes.get((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision);
    else value = (0, $69ecbdaa96f3962d$export$692079bb871c6039).precisionOptions[0];
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)((0, $69ecbdaa96f3962d$export$692079bb871c6039).precisionOptions, (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision, value, id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_precision + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */ function $589572943861997b$var$createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    let value;
    if (pTpair.attributes.has((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc)) value = pTpair.attributes.get((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc);
    else value = NaN.toString();
    console.log((0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + (0, $754b7c8446bbe616$export$3fe97ecb6b172244).s_excessReactantConc + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    return input;
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */ function $589572943861997b$var$createBathGasSelectElement(id, pTpair, bathGas, first, moleculeKeys) {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select = $589572943861997b$var$createSelectElementBathGas(Array.from(moleculeKeys), bathGas, first, id);
    //select.id = id;
    select.addEventListener("change", (event)=>{
        let target = event.target;
        pTpair.setBathGas(new (0, $754b7c8446bbe616$export$b33a132661f4be58)(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */ function $589572943861997b$var$createSelectElementBathGas(options, bathGas, first, id) {
    let value;
    if (first) options.push((0, $7e68913db756e51f$export$d8b8827abc8ab7e7));
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf((0, $7e68913db756e51f$export$d8b8827abc8ab7e7));
        if (index > -1) options.splice(index, 1);
    }
    if (bathGas == undefined) {
        bathGas = new (0, $754b7c8446bbe616$export$b33a132661f4be58)(new Map(), (0, $7e68913db756e51f$export$d8b8827abc8ab7e7));
        value = (0, $7e68913db756e51f$export$d8b8827abc8ab7e7);
    } else value = bathGas.value;
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName, value, (0, $7e68913db756e51f$export$bea69a603fae01a6)(id, (0, $f0396edd0a5c99f7$export$8797b0c8298d191)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    select.classList.add((0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
    (0, $7e68913db756e51f$export$3b08dcba56872ec6)(options, select);
    // Add event listener to selectElement.
    select.addEventListener("change", (event)=>{
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as " + (0, $754b7c8446bbe616$export$b33a132661f4be58).tagName);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    select.value = value;
    (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
    return select;
}
function $589572943861997b$var$createExperimentalRateDetails(id, pTpair) {
    return $589572943861997b$var$addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalRate(), (pTpair, value)=>pTpair.setExperimentalRate(value), (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b), [
        {
            tagName: (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(pTpair.getExperimentalRate(), target),
            valueGetter: ()=>pTpair.getExperimentalRate().value.toString()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_ref1,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef1(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef1()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_ref2,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef2(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef2()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_refReaction,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRefReaction(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRefReaction()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).tagName + "_" + (0, $754b7c8446bbe616$export$cdeafdd1d936ed5b).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value)),
            valueGetter: ()=>pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
function $589572943861997b$var$createExperimentalYieldDetails(id, pTpair) {
    return $589572943861997b$var$addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalYield(), (pTpair, value)=>pTpair.setExperimentalYield(value), (0, $754b7c8446bbe616$export$c291f4faacd745a6), [
        {
            tagName: (0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(pTpair.getExperimentalYield(), target),
            valueGetter: ()=>pTpair.getExperimentalYield().value.toString()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_ref,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setRef(target.value),
            valueGetter: ()=>pTpair.getExperimentalYield().getRef()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_yieldTime,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setYieldTime(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$c291f4faacd745a6).tagName + "_" + (0, $754b7c8446bbe616$export$c291f4faacd745a6).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
function $589572943861997b$var$createExperimentalEigenvalueDetails(id, pTpair) {
    return $589572943861997b$var$addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalEigenvalue(), (pTpair, value)=>pTpair.setExperimentalEigenvalue(value), (0, $754b7c8446bbe616$export$ed9dfbc127680fd1), [
        {
            tagName: (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(pTpair.getExperimentalEigenvalue(), target),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().value.toString()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName + "_" + (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).s_EigenvalueID,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getEigenvalueID()
        },
        {
            tagName: (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).tagName + "_" + (0, $754b7c8446bbe616$export$ed9dfbc127680fd1).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setError(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value)),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getError().toString()
        }
    ]);
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param getExperimental The getter.
 * @param setExperimental The setter.
 * @param ExperimentalClass The class.
 * @param details The details.
 * @returns HTMLDivElement.
 */ function $589572943861997b$var$addExperimentalDetails(pTpair, id, getExperimental, setExperimental, ExperimentalClass, details) {
    let div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.id = id;
    let experimental = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
        setExperimental(pTpair, experimental);
    }
    for (let detail of details){
        let detailId = id + "_" + detail.tagName;
        div.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)(detail.type, detailId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
            let target = event.target;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}










function $dde1c59fe054f706$export$7502110c3a5d7b36(xml, modelParametersIDs) {
    console.log((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName);
    // Create a div for the modelParameterss.
    let mpsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    let xml_mps = xml.getElementsByTagName((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName);
    for(let i = 0; i < xml_mps.length; i++){
        // Create a collapsible div for the model parameters.
        let mpDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName, i.toString());
        let mpDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mpDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        let mpcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mpDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let mpcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mpcDivID, mpsDiv, null, mpDiv, (0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        let mp = $dde1c59fe054f706$var$addModelParameters((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mps[i]), i);
        $dde1c59fe054f706$var$processGrainSize(mp, xml_mps[i], mpDiv, modelParametersIDs);
        //setGrainSize(mp, xml_mps[i], mpDiv);
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, (0, $08d0a8a73bf11acb$export$576b56ca6e34780b), mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne.bind(mp));
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, (0, $f7e4eb4e898217f9$export$aa73446724166cdb), mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill.bind(mp));
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, xml_mps[i], mpDiv, (0, $f7e4eb4e898217f9$export$f9c72965e4ddfc8e), mp.setMaxTemperature, mp.removeMaxTemperature.bind(mp));
        // Add a remove modelParameters button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(mpDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeModelParameters.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the modelParameters.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    }
    // Create an add button to add a modelParameters.
    $dde1c59fe054f706$var$createAddModelParametersButton(mpsDiv, modelParametersIDs);
    return mpsDiv;
}
/**
 * Add and return a new modelParameters.
 */ function $dde1c59fe054f706$var$addModelParameters(attributes, i) {
    let mp = new (0, $f7e4eb4e898217f9$export$77f098867dc64198)(attributes, i);
    (0, $7e68913db756e51f$export$3bb92be1f57fd129).addModelParameters(mp);
    return mp;
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function $dde1c59fe054f706$var$processGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, $f7e4eb4e898217f9$export$26e33f0df9ce919d).tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, (0, $7e68913db756e51f$export$39c84188a71202f7));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    let gs;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
            gs = new (0, $f7e4eb4e898217f9$export$26e33f0df9ce919d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            $dde1c59fe054f706$var$createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits);
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        } else {
            gs = $dde1c59fe054f706$var$getDefaultGrainsize(tagName);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        }
    } else {
        gs = $dde1c59fe054f706$var$getDefaultGrainsize(tagName);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the GrainSize already exists
        if (!mps.index.has((0, $f7e4eb4e898217f9$export$26e33f0df9ce919d).tagName)) {
            $dde1c59fe054f706$var$createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)(idi, (0, $7e68913db756e51f$export$5a13f59b7b9618a3)))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function $dde1c59fe054f706$var$setGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, $f7e4eb4e898217f9$export$26e33f0df9ce919d).tagName;
    let div = $dde1c59fe054f706$var$addGrainSize(mps, mpsDiv, modelParametersIDs);
    // Save the current display style of the div
    let originalDisplay = div.style.display;
    // Make the div visible
    div.style.display = "block";
    let input = div.querySelector("input");
    // restore the original display style
    div.style.display = originalDisplay;
    //let input: HTMLInputElement = document.getElementById(getID(mpsDiv.id, tagName, s_input)) as HTMLInputElement;
    let xml = xml_mps.getElementsByTagName(tagName);
    if (xml.length > 0) {
        if (xml.length > 1) console.warn("More than one GrainSize found in XML. The first is used!");
        let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
        mps.getGrainSize().value = value;
        if (input !== null) {
            input.value = valueString;
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
        } else console.warn("GrainSize input element not found.");
    }
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function $dde1c59fe054f706$var$addGrainSize(mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, $f7e4eb4e898217f9$export$26e33f0df9ce919d).tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, (0, $7e68913db756e51f$export$39c84188a71202f7));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    let gs;
    button.textContent = buttonTextContentDeselected;
    button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the GrainSize already exists
        if (!mps.index.has((0, $f7e4eb4e898217f9$export$26e33f0df9ce919d).tagName)) {
            console.log("Adding GrainSize input");
            gs = $dde1c59fe054f706$var$getDefaultGrainsize(tagName);
            mps.setGrainSize(gs);
            $dde1c59fe054f706$var$createInputModelParameters(mps, div, gs, idi, gs.value.toString(), mps.setGrainSize, (0, $69ecbdaa96f3962d$export$692079bb871c6039).energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            console.log("Removing GrainSize input");
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)(idi, (0, $7e68913db756e51f$export$5a13f59b7b9618a3)))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
    //button.click();
    return div;
}
function $dde1c59fe054f706$var$getDefaultGrainsize(tagName) {
    let value;
    let attributes;
    if ((0, $7e68913db756e51f$export$ebe90cb607ad99e) != undefined) {
        let valueString = (0, $7e68913db756e51f$export$ebe90cb607ad99e).values.get(tagName) ?? "";
        if (valueString == "") value = (0, $7e68913db756e51f$export$a94c859b6fc3ec52);
        else value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
        attributes = (0, $7e68913db756e51f$export$ebe90cb607ad99e).attributess.get(tagName) ?? new Map();
    } else {
        console.log(tagName + " set using hardcoded default.");
        value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(101);
        attributes = new Map();
        attributes.set((0, $7e68913db756e51f$export$5a13f59b7b9618a3), "cm-1");
    }
    return new (0, $f7e4eb4e898217f9$export$26e33f0df9ce919d)(attributes, value);
}
/**
 * Process numerical modelParameters.
 * @param mps The ModelParameters.
 * @param mpsDiv The modelParameters div.
 * @param xml_mps The xml modelParameters.
 */ function $dde1c59fe054f706$var$processModelParametersN(mps, modelParametersIDs, xml_mps, mpsDiv, mpt, setModelParameter, removeModelParameter) {
    let tagName = mpt.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, (0, $7e68913db756e51f$export$39c84188a71202f7));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    let mp;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
            let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
            mp = new mpt((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            $dde1c59fe054f706$var$createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        } else {
            valueString = "";
            mp = new mpt(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        }
    } else {
        valueString = "";
        mp = new mpt(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    }
    // Add event listener for the button.
    button.addEventListener("click", ()=>{
        // Check if the ModelParameter already exists
        if (!mps.index.has(tagName)) {
            $dde1c59fe054f706$var$createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        } else {
            //valueString = mp.value.toExponential();
            removeModelParameter();
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(idi);
            modelParametersIDs.removeID(idi);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
/**
 * @param mps The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */ function $dde1c59fe054f706$var$createInputModelParameters(mps, div, element, id, valueString, setElementMethod, units) {
    setElementMethod.call(mps, element);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(input);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(element, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    (0, $7e68913db756e51f$export$2b2254f82abcc900)(units, element.attributes, div, input, (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $7e68913db756e51f$export$5a13f59b7b9618a3)), element.constructor.tagName, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
}
/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */ function $dde1c59fe054f706$var$createAddModelParametersButton(mpsDiv, modelParametersIDs) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
    let tn = (0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName;
    mpsDiv.appendChild(button);
    button.addEventListener("click", (event)=>{
        let i = (0, $7e68913db756e51f$export$3bb92be1f57fd129).getNextModelParametersID();
        console.log("Add " + tn + i.toString());
        // Create collapsible div.
        let mpDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(tn, i.toString());
        let mpDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mpDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        let mpcDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(mpDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)(tn, (i - 1).toString(), (0, $7e68913db756e51f$export$7295f538b9762c5)));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == mpsDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        let mpcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mpcDivID, mpsDiv, elementToInsertBefore, mpDiv, tn + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Add the modelParameters.
        let mp = $dde1c59fe054f706$var$addModelParameters(new Map(), i);
        $dde1c59fe054f706$var$addGrainSize(mp, mpDiv, modelParametersIDs);
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, null, mpDiv, (0, $08d0a8a73bf11acb$export$576b56ca6e34780b), mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, null, mpDiv, (0, $f7e4eb4e898217f9$export$aa73446724166cdb), mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        $dde1c59fe054f706$var$processModelParametersN(mp, modelParametersIDs, null, mpDiv, (0, $f7e4eb4e898217f9$export$f9c72965e4ddfc8e), mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(mpDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeModelParameters.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the modelParameters.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(mpcDivID);
            modelParametersIDs.removeIDs(mpDivID);
        });
    });
    return button;
}









function $180486e70a03b1bd$export$76caf53413cf3464(xml, controlIDs) {
    console.log((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName);
    // Create a div for the controls.
    let controlsDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName);
    for(let i = 0; i < xml_controls.length; i++){
        //console.log("Control " + i);
        let xml_control = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName, i.toString());
        let cDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(cDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        controlsDiv.appendChild(cDiv);
        let ccDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(cDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let ccDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ccDivID, controlsDiv, null, cDiv, (0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        let control = $180486e70a03b1bd$var$addControl((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        $180486e70a03b1bd$var$getControlOptionsSimple(control).forEach((option)=>{
            $180486e70a03b1bd$var$handleControl(control, cDiv, controlIDs, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        $180486e70a03b1bd$var$handleTestMicroRates(control, cDiv, controlIDs, null, (0, $7e68913db756e51f$export$39c84188a71202f7));
        $180486e70a03b1bd$var$handleCalcMethod(control, cDiv, controlIDs, xml_control, (0, $7e68913db756e51f$export$39c84188a71202f7));
        $180486e70a03b1bd$var$getControlItems(control).forEach((item)=>{
            $180486e70a03b1bd$var$handleControl(control, cDiv, controlIDs, onOffControls, xml_control, (0, $7e68913db756e51f$export$39c84188a71202f7), item.class, item.setMethod, item.removeMethod, true);
        });
        // me:ForceMacroDetailedBalance
        let xml_fdb = xml_control.getElementsByTagName((0, $08d0a8a73bf11acb$export$6ffea14bdffd427f).tagName);
        if (xml_fdb.length == 1) {
            let fdb_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_fdb[0]);
            let s = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_fdb[0]));
            //console.log("ForceMacroDetailedBalance: " + s);
            // Maybe there is no value for the ForceMacroDetailedBalance?
            let fdb = new (0, $08d0a8a73bf11acb$export$6ffea14bdffd427f)(fdb_attributes, s);
            control.setForceMacroDetailedBalance(fdb);
            let fdbDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(controlIDs.addID(cDivID, (0, $08d0a8a73bf11acb$export$6ffea14bdffd427f).tagName), (0, $7e68913db756e51f$export$39c84188a71202f7));
            cDiv.appendChild(fdbDiv);
            let fdbl = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $08d0a8a73bf11acb$export$6ffea14bdffd427f).tagName + " " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(fdb_attributes) + " " + s, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
            fdbDiv.appendChild(fdbl);
        }
        // Add a remove control button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(cDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeControl.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the control.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(ccDivID);
            controlIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a control.
    $180486e70a03b1bd$var$createAddControlButton(controlsDiv, controlIDs, (0, $7e68913db756e51f$export$39c84188a71202f7));
    return controlsDiv;
}
/**
 * @param control The control.
 * @return An array of the on/off control options.
 */ function $180486e70a03b1bd$var$getControlOptionsSimple(control) {
    return [
        {
            class: (0, $08d0a8a73bf11acb$export$7d9247c9879133fb),
            setMethod: control.setCalculateRateCoefficientsOnly,
            removeMethod: control.removeCalculateRateCoefficientsOnly
        },
        {
            class: (0, $08d0a8a73bf11acb$export$60b233651e162b60),
            setMethod: control.setPrintCellDOS,
            removeMethod: control.removePrintCellDOS
        },
        {
            class: (0, $08d0a8a73bf11acb$export$7e63e5104be309ff),
            setMethod: control.setPrintCellTransitionStateFlux,
            removeMethod: control.removePrintCellTransitionStateFlux
        },
        {
            class: (0, $08d0a8a73bf11acb$export$a915db169f144f37),
            setMethod: control.setPrintReactionOperatorColumnSums,
            removeMethod: control.removePrintReactionOperatorColumnSums
        },
        {
            class: (0, $08d0a8a73bf11acb$export$e7fff349901f700d),
            setMethod: control.setPrintGrainBoltzmann,
            removeMethod: control.removePrintGrainBoltzmann
        },
        {
            class: (0, $08d0a8a73bf11acb$export$d23243bda4dfae2b),
            setMethod: control.setPrintGrainDOS,
            removeMethod: control.removePrintGrainDOS
        },
        {
            class: (0, $08d0a8a73bf11acb$export$55888ef4e813a34d),
            setMethod: control.setPrintGrainkbE,
            removeMethod: control.removePrintGrainkbE
        },
        {
            class: (0, $08d0a8a73bf11acb$export$f8d814a406a0ff5b),
            setMethod: control.setPrintGrainkfE,
            removeMethod: control.removePrintGrainkfE
        },
        {
            class: (0, $08d0a8a73bf11acb$export$3627f2b606ffd3cb),
            setMethod: control.setPrintTSsos,
            removeMethod: control.removePrintTSsos
        },
        {
            class: (0, $08d0a8a73bf11acb$export$c5481d114fddc81c),
            setMethod: control.setPrintGrainedSpeciesProfile,
            removeMethod: control.removePrintGrainedSpeciesProfile
        },
        {
            class: (0, $08d0a8a73bf11acb$export$ec7c00ae1b17b2ab),
            setMethod: control.setPrintGrainTransitionStateFlux,
            removeMethod: control.removePrintGrainTransitionStateFlux
        },
        {
            class: (0, $08d0a8a73bf11acb$export$8420ab6988728a65),
            setMethod: control.setPrintReactionOperatorSize,
            removeMethod: control.removePrintReactionOperatorSize
        },
        {
            class: (0, $08d0a8a73bf11acb$export$ed9b9e07e51c2ac1),
            setMethod: control.setPrintSpeciesProfile,
            removeMethod: control.removePrintSpeciesProfile
        },
        {
            class: (0, $08d0a8a73bf11acb$export$9f7939759d8efd9f),
            setMethod: control.setPrintPhenomenologicalEvolution,
            removeMethod: control.removePrintPhenomenologicalEvolution
        },
        {
            class: (0, $08d0a8a73bf11acb$export$fc99460819e23ac5),
            setMethod: control.setPrintTunnelingCoefficients,
            removeMethod: control.removePrintTunnelingCoefficients
        },
        {
            class: (0, $08d0a8a73bf11acb$export$2f2eaac8983031ef),
            setMethod: control.setPrintCrossingCoefficients,
            removeMethod: control.removePrintCrossingCoefficients
        },
        {
            class: (0, $08d0a8a73bf11acb$export$a3d7e677521f681f),
            setMethod: control.setTestDOS,
            removeMethod: control.removeTestDOS
        },
        {
            class: (0, $08d0a8a73bf11acb$export$980e5abe9a459423),
            setMethod: control.setTestRateConstants,
            removeMethod: control.removeTestRateConstants
        },
        {
            class: (0, $08d0a8a73bf11acb$export$5d7dbeba4bf49655),
            setMethod: control.setUseTheSameCellNumberForAllConditions,
            removeMethod: control.removeUseTheSameCellNumberForAllConditions
        },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        {
            class: (0, $08d0a8a73bf11acb$export$6ffea14bdffd427f),
            setMethod: control.setForceMacroDetailedBalance,
            removeMethod: control.removeForceMacroDetailedBalance
        }
    ];
}
/**
 * @param control The control.
 * @return An array of the control items.
 */ function $180486e70a03b1bd$var$getControlItems(control) {
    return [
        {
            class: (0, $08d0a8a73bf11acb$export$2453e311f702d9c7),
            setMethod: control.setEigenvalues,
            removeMethod: control.removeEigenvalues
        },
        {
            class: (0, $08d0a8a73bf11acb$export$421603058c6718db),
            setMethod: control.setShortestTimeOfInterest,
            removeMethod: control.removeShortestTimeOfInterest
        },
        {
            class: (0, $08d0a8a73bf11acb$export$b51d7314540831ed),
            setMethod: control.setMaximumEvolutionTime,
            removeMethod: control.removeMaximumEvolutionTime
        },
        {
            class: (0, $08d0a8a73bf11acb$export$576b56ca6e34780b),
            setMethod: control.setAutomaticallySetMaxEne,
            removeMethod: control.removeAutomaticallySetMaxEne
        },
        {
            class: (0, $08d0a8a73bf11acb$export$159b5d3263f1049a),
            setMethod: control.setDiagramEnergyOffset,
            removeMethod: control.removeDiagramEnergyOffset
        }
    ];
}
/**
 * @param controlsDiv 
 * @param level The level.
 * @returns A button.
 */ function $180486e70a03b1bd$var$createAddControlButton(controlsDiv, controlIDs, level) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)((0, $7e68913db756e51f$export$1bb8965d05fbf467), undefined, (0, $7e68913db756e51f$export$39c84188a71202f7));
    controlsDiv.appendChild(button);
    button.addEventListener("click", (event)=>{
        let i = (0, $7e68913db756e51f$export$3bb92be1f57fd129).getNextControlID();
        console.log("Add Control " + i.toString());
        let cDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName, i.toString());
        let cDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(cDivID, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, $134d19e749bf0414$export$3205c97bcf96f7dc)((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName, (i - 1).toString(), (0, $7e68913db756e51f$export$7295f538b9762c5)));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        // Create a collapsible div for each conditions.
        let ccDivID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(cDivID, (0, $7e68913db756e51f$export$7295f538b9762c5));
        let ccDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(ccDivID, controlsDiv, elementToInsertBefore, cDiv, (0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName + " " + i.toString(), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$39c84188a71202f7));
        // Add the control
        let control = $180486e70a03b1bd$var$addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        $180486e70a03b1bd$var$getControlOptionsSimple(control).forEach((option)=>{
            $180486e70a03b1bd$var$handleControl(control, cDiv, controlIDs, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        $180486e70a03b1bd$var$handleTestMicroRates(control, cDiv, controlIDs, null, level);
        $180486e70a03b1bd$var$handleCalcMethod(control, cDiv, controlIDs, null, level);
        $180486e70a03b1bd$var$getControlItems(control).forEach((item)=>{
            $180486e70a03b1bd$var$handleControl(control, cDiv, controlIDs, onOffControls, null, level, item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = (0, $7e68913db756e51f$export$590bdcb7f5f5327a)(cDiv, (0, $7e68913db756e51f$export$39c84188a71202f7), (0, $7e68913db756e51f$export$3bb92be1f57fd129).removeControl.bind((0, $7e68913db756e51f$export$3bb92be1f57fd129)), i);
        removeButton.addEventListener("click", (event)=>{
            // Remove the control.
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(ccDivID);
            controlIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */ function $180486e70a03b1bd$var$addControl(attributes, i) {
    let control = new (0, $08d0a8a73bf11acb$export$7a7fa4424cb20976)(attributes, i);
    (0, $7e68913db756e51f$export$3bb92be1f57fd129).addControl(control);
    return control;
}
/**
 * @param control The control.
 * @param div The div.
 * @param obj The object.
 * @param setControlMethod The set control method. 
 * @param id The id for the input.
 * @param valueString The value string.
 */ function $180486e70a03b1bd$var$createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("number", id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    input.addEventListener("change", (event)=>{
        let target = event.target;
        (0, $7e68913db756e51f$export$b1e4cbf5b56e0e21)(obj, target);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * 
 * @param control The control.
 * @param cDiv The control div.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */ function $180486e70a03b1bd$var$handleControl(control, cDiv, controlIDs, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    if (onOffControls) onOffControls.set(tagName, button);
    let controlInstance;
    let div;
    let id;
    if (level) {
        id = controlIDs.addID(cDiv.id, tagName);
        div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, level);
        cDiv.appendChild(div);
        div.appendChild(button);
        id = controlIDs.addID(cDiv.id, id, (0, $7e68913db756e51f$export$58785e0018b77d4a));
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml[0]));
                let value;
                // Deal with the special case of eigenvalues, which can take either numerical or string values.
                value = valueString == "all" ? new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(0) : new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(valueString);
                controlInstance = new ControlClass((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]), value);
                $180486e70a03b1bd$var$createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            } else {
                controlInstance = new ControlClass((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]));
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        } else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        }
    } else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
    }
    button.addEventListener("click", (event)=>{
        if (!control.index.has(tagName)) {
            if (handleInput) $180486e70a03b1bd$var$createInputControlItem(control, div, controlInstance, setControlMethod, id, "");
            else setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
        } else {
            if (handleInput) (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(id);
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
/**
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control. 
 * @param level The level.
 */ function $180486e70a03b1bd$var$handleCalcMethod(control, cDiv, controlIDs, xml_control, level) {
    //console.log("handleCalcMethod " + (xml_control == null));
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, level);
    cDiv.appendChild(div);
    let tagName = (0, $08d0a8a73bf11acb$export$f0bfd84d03c3a22d).tagName;
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, undefined, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    // Add the div for the CalcMethod.
    let divCmId = controlIDs.addID(cDiv.id, tagName);
    let divCm = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divCmId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(divCm);
    let options = (0, $08d0a8a73bf11acb$export$f0bfd84d03c3a22d).options;
    let divCmDetailsId = controlIDs.addID(divCmId, "details");
    let divCmDetailsSelectId = controlIDs.addID(divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control != null) {
        //let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagNameNS("http://www.chem.leeds.ac.uk/mesmer", "calcMethod");
        let xml = xml_control.getElementsByTagName(tagName);
        //console.log("xml.length " + xml.length);
        if (xml.length > 0) {
            if (xml.length > 1) throw new Error("More than one CalcMethod element.");
            let attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = $180486e70a03b1bd$var$getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                if (options[options.length - 1] != (0, $7e68913db756e51f$export$d8b8827abc8ab7e7)) options.push((0, $7e68913db756e51f$export$d8b8827abc8ab7e7));
            }
            // Remove select.
            //remove(divCmId);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(divCmDetailsId);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(divCmDetailsSelectId);
            // Create the select element.
            let select = $180486e70a03b1bd$var$createSelectElementCalcMethod(control, div, options, tagName, (0, $7e68913db756e51f$export$d8b8827abc8ab7e7), divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        } else if (control.getCalcMethod() != null) {
            control.removeCalcMethod();
            // Remove any existing div.
            //remove(divCmId);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(divCmDetailsId);
            //console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
            //console.log("button.textContent " + button.textContent);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(divCmDetailsSelectId);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
        }
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */ function $180486e70a03b1bd$var$handleTestMicroRates(control, cDiv, controlIDs, xml_control, level) {
    let tagName = (0, $08d0a8a73bf11acb$export$1f37c7c73e401f31).tagName;
    let divID = controlIDs.addID(cDiv.id, tagName);
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divID, level);
    cDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, $7e68913db756e51f$export$f0fb6e9d3fd6cf72);
    let buttonTextContentDeselected = tagName + (0, $7e68913db756e51f$export$b758aa9bd161846e);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(tagName, controlIDs.addID(cDiv.id, tagName, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(button);
    button.classList.add((0, $7e68913db756e51f$export$50cc31b59b02e033));
    button.classList.add((0, $7e68913db756e51f$export$d52efe23389358db));
    let idTmax = controlIDs.addID(cDiv.id, tagName, (0, $08d0a8a73bf11acb$export$58c8f4b7ec654137).tagName);
    let idTmin = controlIDs.addID(cDiv.id, tagName, (0, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7).tagName);
    let idTstep = controlIDs.addID(cDiv.id, tagName, (0, $08d0a8a73bf11acb$export$7b8cfe3a6a460886).tagName);
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            $180486e70a03b1bd$var$createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            $180486e70a03b1bd$var$createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, $7e68913db756e51f$export$50cc31b59b02e033));
        button.classList.toggle((0, $7e68913db756e51f$export$d52efe23389358db));
    });
}
/**
 * @param control The control.
 * @param div The div.
 * @param xml_tmr The xml.
 * @param idTmax The Tmax id.
 * @param idTmin The Tmin id.
 * @param idTstep The Tstep id.
 */ function $180486e70a03b1bd$var$createTestMicroRates(control, div, xml_tmr, idTmax, idTmin, idTstep) {
    let attributes;
    let tmr;
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) throw new Error("More than one TestMicroRates element.");
        attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_tmr[0]);
        tmr = new (0, $08d0a8a73bf11acb$export$1f37c7c73e401f31)(attributes);
    } else {
        attributes = new Map();
        attributes.set("Tmax", "0"); // These should load from some kind of default...
        attributes.set("Tmin", "0");
        attributes.set("Tstep", "0");
        tmr = new (0, $08d0a8a73bf11acb$export$1f37c7c73e401f31)(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", idTmax + "_input", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
        let target = event.target;
        // Check the value is a number.
        try {
            tmr.setTmax(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
            console.log("Set Tmax to " + target.value);
        } catch (e) {
            alert("Invalid input, resetting...");
            target.value = tMax.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tMax.toString(), "Tmax");
    tMaxlwi.id = idTmax;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tMaxlwi.querySelector("input"));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", idTmin + "_input", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            tmr.setTmin(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
            console.log("Set Tmin to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMin.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tMin.toString(), "Tmin");
    tMinlwi.id = idTmin;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tMinlwi.querySelector("input"));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", idTstep + "_input", (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            tmr.setTstep(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
            console.log("Set Tstep to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tStep.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, tStep.toString(), "Tstep");
    tSteplwi.id = idTstep;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(tSteplwi.querySelector("input"));
    div.appendChild(tSteplwi);
}
/**
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param divCm The div cm.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @returns The CalcMethod.
 */ function $180486e70a03b1bd$var$getCalcMethod(control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId) {
    //console.log("getCalcMethod");
    let cm;
    // Create the select element.
    let select = $180486e70a03b1bd$var$createSelectElementCalcMethod(control, divCm, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divCmDetailsId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    divCm.appendChild(divCmDetails);
    if (xsi_type == (0, $08d0a8a73bf11acb$export$afd374542f6f3da6).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$afd374542f6f3da6).xsi_type2) //console.log("CalcMethodSimpleCalc");
    cm = new (0, $08d0a8a73bf11acb$export$afd374542f6f3da6)(attributes);
    else if (xsi_type == (0, $08d0a8a73bf11acb$export$271191b096a55e63).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$271191b096a55e63).xsi_type2) cm = new (0, $08d0a8a73bf11acb$export$271191b096a55e63)(attributes);
    else if (xsi_type == (0, $08d0a8a73bf11acb$export$654b70df01671c79).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$654b70df01671c79).xsi_type2) {
        let cmf = new (0, $08d0a8a73bf11acb$export$654b70df01671c79)(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml = xml[0].getElementsByTagName((0, $08d0a8a73bf11acb$export$830a50cd13af6e84).tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(fi_xml[0])));
                let fittingIterations = new (0, $08d0a8a73bf11acb$export$830a50cd13af6e84)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            } else throw new Error("More than one FittingIterations element.");
        }
        $180486e70a03b1bd$var$processCalcMethodFitting(divCmDetails, cmf);
    } else if (xsi_type == (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa).xsi_type2) {
        let cmm = new (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa)(attributes);
        cm = cmm;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = (0, $08d0a8a73bf11acb$export$9f699e98369d9591).tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0])));
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $08d0a8a73bf11acb$export$9f699e98369d9591), cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, (0, $08d0a8a73bf11acb$export$ca1e6c3ff9fd3627), cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, (0, $08d0a8a73bf11acb$export$d3887b529debf19d), cmm.setMarquardtDerivDelta.bind(cmm));
        $180486e70a03b1bd$var$processCalcMethodMarquardt(divCmDetails, cmm);
    } else if (xsi_type == (0, $08d0a8a73bf11acb$export$fe9781900d201bdf).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$fe9781900d201bdf).xsi_type2) {
        let cmar = new (0, $08d0a8a73bf11acb$export$fe9781900d201bdf)(attributes);
        cm = cmar;
        function processElement(xml, ClassConstructor, setterMethod, isNumber) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0]));
                    if (isNumber) {
                        if (value != undefined) value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(value);
                    }
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $08d0a8a73bf11acb$export$93514d28bd18d75a), cmar.setFormat.bind(cmar), false);
        processElement(xml, (0, $08d0a8a73bf11acb$export$be201676156f3e60), cmar.setPrecision.bind(cmar), false);
        processElement(xml, (0, $08d0a8a73bf11acb$export$19d20f3642d82681), cmar.setChebNumTemp.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$906be0805438fd80), cmar.setChebNumConc.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$6ab4fe1621c91452), cmar.setChebMaxTemp.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$e9853d49316ae9ae), cmar.setChebMinTemp.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$39eacc768d7e9bb), cmar.setChebMaxConc.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$78194e57ce26d99a), cmar.setChebMinConc.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$96094ac7e31a750e), cmar.setChebTExSize.bind(cmar), true);
        processElement(xml, (0, $08d0a8a73bf11acb$export$ae695595d3952700), cmar.setChebPExSize.bind(cmar), true);
        $180486e70a03b1bd$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    } else if (xsi_type == (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4).xsi_type2) {
        let cmtt = new (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4)(attributes);
        cm = cmtt;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0])));
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7), cmtt.setTmin.bind(cmtt));
        processElement(xml, (0, $08d0a8a73bf11acb$export$ac2eb7df727f506d), cmtt.setTmid.bind(cmtt));
        processElement(xml, (0, $08d0a8a73bf11acb$export$58c8f4b7ec654137), cmtt.setTmax.bind(cmtt));
        processElement(xml, (0, $08d0a8a73bf11acb$export$7b8cfe3a6a460886), cmtt.setTstep.bind(cmtt));
        $180486e70a03b1bd$var$processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    } else if (xsi_type == (0, $08d0a8a73bf11acb$export$a532500cc43efbef).xsi_type || xsi_type == (0, $08d0a8a73bf11acb$export$a532500cc43efbef).xsi_type2) {
        let cmsa = new (0, $08d0a8a73bf11acb$export$a532500cc43efbef)(attributes);
        cm = cmsa;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, $cc8c7201a9bad777$export$13cb40e9b656ab9e)((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(elementXml[0]));
                    if (value != undefined) value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(value);
                    let instance = new ClassConstructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, $08d0a8a73bf11acb$export$37d0520a9fac7849), cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement(xml, (0, $08d0a8a73bf11acb$export$9a832710e54827ea), cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement(xml, (0, $08d0a8a73bf11acb$export$b43b57458ce8fb96), cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement(xml, (0, $08d0a8a73bf11acb$export$e98aeac6c6b1df09), cmsa.setSensitivityVarRedMethod.bind(cmsa));
        $180486e70a03b1bd$var$processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    } else {
        // If there is a name attribute instead, try this in place of the xsi:type.
        let name = attributes.get("name");
        if (name != undefined && name !== xsi_type) {
            attributes.set("xsi:type", name);
            console.warn(`Using name attribute as xsi:type: ${name}`);
            return $180486e70a03b1bd$var$getCalcMethod(control, divCm, xml, options, attributes, tagName, name, divCmDetailsId, divCmDetailsSelectId);
        } else throw new Error(`Unable to determine calculation method for xsi_type: ${xsi_type}`);
    }
    return cm;
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */ function $180486e70a03b1bd$var$processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fi = cm.getFittingIterations() || new (0, $08d0a8a73bf11acb$export$830a50cd13af6e84)(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
    cm.setFittingIterations(fi);
    divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetails.id, (0, $08d0a8a73bf11acb$export$830a50cd13af6e84).tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
            fi.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
            console.log("Set FittingIterations to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = fi.value.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, fi.value.toString(), (0, $08d0a8a73bf11acb$export$830a50cd13af6e84).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */ function $180486e70a03b1bd$var$processCalcMethodMarquardt(divCmDetails, cm) {
    function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
        let id = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetails.id, obj.tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a));
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, $134d19e749bf0414$export$e90fb89750dba83f)(target.value)) {
                obj.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
        };
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let mi = cm.getMarquardtIterations() || new (0, $08d0a8a73bf11acb$export$9f699e98369d9591)(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
    cm.setMarquardtIterations(mi);
    createLabelWithInputForObject(mi, divCmDetails, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee));
    // MarquardtTolerance.
    let mt = cm.getMarquardtTolerance() || new (0, $08d0a8a73bf11acb$export$ca1e6c3ff9fd3627)(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
    cm.setMarquardtTolerance(mt);
    createLabelWithInputForObject(mt, divCmDetails, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee));
    // MarquardtDerivDelta.
    let mdd = cm.getMarquardtDerivDelta() || new (0, $08d0a8a73bf11acb$export$d3887b529debf19d)(new Map(), (0, $7e68913db756e51f$export$a94c859b6fc3ec52));
    cm.setMarquardtDerivDelta(mdd);
    createLabelWithInputForObject(mdd, divCmDetails, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */ function $180486e70a03b1bd$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new (0, $08d0a8a73bf11acb$export$93514d28bd18d75a)(new Map(), (0, $08d0a8a73bf11acb$export$93514d28bd18d75a).options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor, getter, setter, tagName, options) {
        let element = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(tagName, options, tagName, element.value, divCmDetails.id, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        lwsElement.querySelector("select")?.addEventListener("change", (event)=>{
            let target = event.target;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement((0, $08d0a8a73bf11acb$export$93514d28bd18d75a), cm.getFormat.bind(cm), cm.setFormat.bind(cm), (0, $08d0a8a73bf11acb$export$93514d28bd18d75a).tagName, (0, $08d0a8a73bf11acb$export$93514d28bd18d75a).options);
    processSelectElement((0, $08d0a8a73bf11acb$export$93514d28bd18d75a), ()=>format.getRateUnits(), format.setRateUnits.bind(format), (0, $08d0a8a73bf11acb$export$93514d28bd18d75a).rateUnits, (0, $08d0a8a73bf11acb$export$93514d28bd18d75a).rateUnitsOptions);
    processSelectElement((0, $08d0a8a73bf11acb$export$be201676156f3e60), cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), (0, $08d0a8a73bf11acb$export$be201676156f3e60).tagName, (0, $69ecbdaa96f3962d$export$692079bb871c6039).precisionOptions);
    // "me:chebNumTemp", "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", divCmDetails.id + `_${tagName}_input`, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), $180486e70a03b1bd$var$handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement((0, $08d0a8a73bf11acb$export$19d20f3642d82681), cm.getChebNumTemp.bind(cm), cm.setChebNumTemp.bind(cm), (0, $08d0a8a73bf11acb$export$19d20f3642d82681).tagName);
    processElement((0, $08d0a8a73bf11acb$export$906be0805438fd80), cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), (0, $08d0a8a73bf11acb$export$906be0805438fd80).tagName);
    processElement((0, $08d0a8a73bf11acb$export$6ab4fe1621c91452), cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), (0, $08d0a8a73bf11acb$export$6ab4fe1621c91452).tagName);
    processElement((0, $08d0a8a73bf11acb$export$e9853d49316ae9ae), cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), (0, $08d0a8a73bf11acb$export$e9853d49316ae9ae).tagName);
    processElement((0, $08d0a8a73bf11acb$export$39eacc768d7e9bb), cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), (0, $08d0a8a73bf11acb$export$39eacc768d7e9bb).tagName);
    processElement((0, $08d0a8a73bf11acb$export$78194e57ce26d99a), cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), (0, $08d0a8a73bf11acb$export$78194e57ce26d99a).tagName);
    processElement((0, $08d0a8a73bf11acb$export$96094ac7e31a750e), cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), (0, $08d0a8a73bf11acb$export$96094ac7e31a750e).tagName);
    processElement((0, $08d0a8a73bf11acb$export$ae695595d3952700), cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), (0, $08d0a8a73bf11acb$export$ae695595d3952700).tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */ function $180486e70a03b1bd$var$processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", divCmDetails.id + `_${tagName}_input`, (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), $180486e70a03b1bd$var$handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement((0, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7), cm.getTmin.bind(cm), cm.setTmin.bind(cm), (0, $08d0a8a73bf11acb$export$7be1a36e1f74dbc7).tagName);
    processElement((0, $08d0a8a73bf11acb$export$ac2eb7df727f506d), cm.getTmid.bind(cm), cm.setTmid.bind(cm), (0, $08d0a8a73bf11acb$export$ac2eb7df727f506d).tagName);
    processElement((0, $08d0a8a73bf11acb$export$58c8f4b7ec654137), cm.getTmax.bind(cm), cm.setTmax.bind(cm), (0, $08d0a8a73bf11acb$export$58c8f4b7ec654137).tagName);
    processElement((0, $08d0a8a73bf11acb$export$7b8cfe3a6a460886), cm.getTstep.bind(cm), cm.setTstep.bind(cm), (0, $08d0a8a73bf11acb$export$7b8cfe3a6a460886).tagName);
}
function $180486e70a03b1bd$var$handleEvent(element, tagName) {
    return (event)=>{
        let target = event.target;
        try {
            element.value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value);
        } catch (e) {
            alert("Invalid input value " + target.value + " , resetting...");
            target.value = element.value.toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    };
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */ function $180486e70a03b1bd$var$processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetails.id, tagName, (0, $7e68913db756e51f$export$58785e0018b77d4a)), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$b1ddbf2a116c10ee), $180486e70a03b1bd$var$handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement((0, $08d0a8a73bf11acb$export$37d0520a9fac7849), cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), (0, $08d0a8a73bf11acb$export$37d0520a9fac7849).tagName);
    processNumberElement((0, $08d0a8a73bf11acb$export$9a832710e54827ea), cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), (0, $08d0a8a73bf11acb$export$9a832710e54827ea).tagName);
    processNumberElement((0, $08d0a8a73bf11acb$export$b43b57458ce8fb96), cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), (0, $08d0a8a73bf11acb$export$b43b57458ce8fb96).tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new (0, $08d0a8a73bf11acb$export$e98aeac6c6b1df09)(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName = (0, $08d0a8a73bf11acb$export$e98aeac6c6b1df09).tagName;
    divCmDetails.appendChild((0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)(tagName, (0, $08d0a8a73bf11acb$export$e98aeac6c6b1df09).options, tagName, (0, $08d0a8a73bf11acb$export$e98aeac6c6b1df09).options[0], (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(divCmDetails.id, tagName, "select"), (0, $7e68913db756e51f$export$d6befed1f1d5e56b), (0, $7e68913db756e51f$export$d6befed1f1d5e56b)));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector("select");
    select?.addEventListener("change", (event)=>{
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
}
/**
 * @param control The control.
 * @param div The div. 
 * @param options The options.
 * @param tagName The tag name.
 * @param value The value.
 * @param id The id for the HTMLSelectElement.
 * @returns An HTMLSelectElement.
 */ function $180486e70a03b1bd$var$createSelectElementCalcMethod(control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, $f0396edd0a5c99f7$export$b89bf4b169286865)(options, tagName, value, divCmDetailsSelectId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
    div.appendChild(select);
    (0, $7e68913db756e51f$export$3b08dcba56872ec6)(options, select);
    select.addEventListener("change", (event)=>{
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) divCmDetails.remove();
        divCmDetails = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(divCmDetailsId, (0, $7e68913db756e51f$export$d6befed1f1d5e56b));
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == (0, $08d0a8a73bf11acb$export$afd374542f6f3da6).xsi_type || value == (0, $08d0a8a73bf11acb$export$afd374542f6f3da6).xsi_type2) // "me:simpleCalc", "simpleCalc".
        control.setCalcMethod(new (0, $08d0a8a73bf11acb$export$afd374542f6f3da6)(attributes));
        else if (value == (0, $08d0a8a73bf11acb$export$271191b096a55e63).xsi_type || value == (0, $08d0a8a73bf11acb$export$271191b096a55e63).xsi_type2) // "me:gridSearch", "gridSearch".
        control.setCalcMethod(new (0, $08d0a8a73bf11acb$export$271191b096a55e63)(attributes));
        else if (value == (0, $08d0a8a73bf11acb$export$654b70df01671c79).xsi_type || value == (0, $08d0a8a73bf11acb$export$654b70df01671c79).xsi_type2) {
            let cm = new (0, $08d0a8a73bf11acb$export$654b70df01671c79)(attributes);
            control.setCalcMethod(cm);
            $180486e70a03b1bd$var$processCalcMethodFitting(divCmDetails, cm);
        } else if (value == (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa).xsi_type || value == (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa).xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new (0, $08d0a8a73bf11acb$export$7968aa666bcf62fa)(attributes);
            control.setCalcMethod(cm);
            $180486e70a03b1bd$var$processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == (0, $08d0a8a73bf11acb$export$fe9781900d201bdf).xsi_type || value == (0, $08d0a8a73bf11acb$export$fe9781900d201bdf).xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new (0, $08d0a8a73bf11acb$export$fe9781900d201bdf)(attributes);
            control.setCalcMethod(cm);
            $180486e70a03b1bd$var$processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4).xsi_type || value == (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4).xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new (0, $08d0a8a73bf11acb$export$16ef3f79998b60b4)(attributes);
            control.setCalcMethod(cm);
            $180486e70a03b1bd$var$processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == (0, $08d0a8a73bf11acb$export$a532500cc43efbef).xsi_type || value == (0, $08d0a8a73bf11acb$export$a532500cc43efbef).xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new (0, $08d0a8a73bf11acb$export$a532500cc43efbef)(new Map());
            control.setCalcMethod(cm);
            $180486e70a03b1bd$var$processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else throw new Error("Unknown CalcMethod type.");
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
    });
    return select;
}



/**
 * Draw a horizontal line and add labels.
 * @param ctx The context to use.
 * @param strokeStyle The name of a style to use for the line.
 * @param strokewidth The width of the line.
 * @param x0 The start x-coordinate of the line.
 * @param y0 The start y-coordinate of the line. Also used for an energy label.
 * @param x1 The end x-coordinate of the line.
 * @param y1 The end y-coordinate of the line.
 * @param font The font to use.
 * @param th The height of the text in pixels.
 * @param label The label.
 * @param energyString The energy.
 */ function $e5f7ab5c40db3f0e$export$479ac392a7fb4419(ctx, strokeStyle, strokewidth, x0, y0, x1, y1, font, th, label, energyString) {
    let x_centre = x0 + (x1 - x0) / 2;
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, energyString, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, energyString, font, x_centre), y1 + th);
    $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, label, font, strokeStyle, $e5f7ab5c40db3f0e$var$getTextStartX(ctx, label, font, x_centre), y1 + 3 * th);
    $e5f7ab5c40db3f0e$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x0, y0, x1, y1);
}
/**
 * @param ctx The context to use.
 * @param text The text to get the start x-coordinate of.
 * @paramfont The font to use.  
 * @param x_centre The x-coordinate of the centre of the text.
 * @returns The x-coordinate of the start of the text.
 */ function $e5f7ab5c40db3f0e$var$getTextStartX(ctx, text, font, x_centre) {
    let tw = $e5f7ab5c40db3f0e$export$37827d046293d309(ctx, text, font);
    return x_centre - tw / 2;
}
function $e5f7ab5c40db3f0e$export$819db45aec5fcbe5(ctx, strokeStyle, strokewidth, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokewidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function $e5f7ab5c40db3f0e$export$bec150f75a9b8f11(ctx, text, font, colour, x, y) {
    // Save the context (to restore after).
    ctx.save();
    // Translate to the point where text is to be added.
    ctx.translate(x, y);
    // Invert Y-axis.
    ctx.scale(1, -1);
    // Set the text font.
    ctx.font = font;
    // Set the text colour.
    ctx.fillStyle = colour;
    // Write the text.
    ctx.fillText(text, 0, 0);
    // Restore the context.
    ctx.restore();
}
function $e5f7ab5c40db3f0e$export$c398604a09be5382(ctx, text, font) {
    ctx.font = font;
    var fontMetric = ctx.measureText(text);
    return fontMetric.actualBoundingBoxAscent + fontMetric.actualBoundingBoxDescent;
}
function $e5f7ab5c40db3f0e$export$37827d046293d309(ctx, text, font) {
    ctx.font = font;
    return ctx.measureText(text).width;
}




function $42d9507eaeb955b6$export$f1b90a337037b551(rdDiv, rdcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, draw) {
    // Create a pop diagram button in its own div.
    let bDivId = (0, $7e68913db756e51f$export$bea69a603fae01a6)(rdDiv.id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e) + "s");
    let bDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(bDivId);
    rdDiv.appendChild(bDiv);
    let pbID = (0, $7e68913db756e51f$export$bea69a603fae01a6)(bDivId, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e));
    let popOutText = "Pop into a new Window";
    let pb = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(popOutText, pbID);
    bDiv.appendChild(pb);
    let rdCanvas = document.createElement("canvas");
    rdCanvas.id = rdcID;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdcHeight;
    rdCanvas.style.border = "1px solid black";
    //rdCanvas.style.margin = "1px";
    if (draw) $42d9507eaeb955b6$export$9a6a0a663dda2923(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    // Add action listener to the pop diagram button.
    pb.addEventListener("click", ()=>{
        //if (rdWindow == null || rdWindow.closed) {
        if (rdWindow == null) {
            let popWindowRDCanvas = document.createElement("canvas");
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", (0, $7e68913db756e51f$export$196db41cc586e1c), "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            if (draw) $42d9507eaeb955b6$export$9a6a0a663dda2923(popWindowRDCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            (0, $7e68913db756e51f$export$cd7f480d6b8286c3)(rdcID);
            pb.textContent = "Pop into this Window";
        } else {
            rdCanvas = document.createElement("canvas");
            rdCanvas.id = rdcID;
            rdDiv.appendChild(rdCanvas);
            rdCanvas.height = rdcHeight;
            rdCanvas.style.border = "1px solid black";
            if (draw) $42d9507eaeb955b6$export$9a6a0a663dda2923(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            rdWindow.close();
            rdWindow = null;
            pb.textContent = popOutText;
        }
    });
    (0, $7e68913db756e51f$export$f0119d1c38383eb8)(rdCanvas, bDiv, null, (0, $7e68913db756e51f$export$196db41cc586e1c));
}
function $42d9507eaeb955b6$export$9a6a0a663dda2923(canvas, rdcHeight, dark, font, lw, lwc, molecules, reactions) {
    console.log("drawReactionDiagram");
    if (canvas != null) {
        // Set foreground and background colors.
        let foreground;
        let background;
        let blue;
        let orange;
        if (dark) {
            foreground = "lightgrey";
            background = "darkgrey";
            blue = "lightblue";
            orange = "orange";
        } else {
            foreground = "darkgrey";
            background = "lightgrey";
            blue = "blue";
            orange = "darkorange";
        }
        let green = "green";
        let red = "red";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
        //ctx.fillStyle = background;
        // Make font bold.
        ctx.font = "bold " + font;
        // Get text height for font size.
        let th = (0, $e5f7ab5c40db3f0e$export$c398604a09be5382)(ctx, "Aj", ctx.font);
        //console.log("th=" + th);
        // Go through reactions:
        // 1. Create sets of reactants, end products, intermediate products and transition states.
        // 2. Create maps of orders and energies.
        // 3. Calculate maximum energy.
        let reactants = [];
        let products = new Set();
        let intProducts = new Set();
        let transitionStates = new Set();
        let orders = new Map();
        let energies = new Map();
        let i = 0;
        let energyMin;
        let energyMax;
        reactions.forEach(function(reaction, id) {
            // Get TransitionStates.
            let reactionTransitionStates = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            if (reactantsLabel != undefined) {
                reactants.push(reactantsLabel);
                if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
                let energy = reaction.getReactantsEnergy((0, $7e68913db756e51f$export$7577c09cb43cc206), molecules);
                energyMin = (0, $134d19e749bf0414$export$96ec731ed4dcb222)(energyMin, energy);
                energyMax = (0, $134d19e749bf0414$export$8960430cfd85939f)(energyMax, energy);
                energies.set(reactantsLabel, energy);
                if (!orders.has(reactantsLabel)) {
                    orders.set(reactantsLabel, i);
                    i++;
                }
            }
            let productsLabel = reaction.getProductsLabel();
            if (productsLabel != undefined) {
                products.add(productsLabel);
                let energy = reaction.getProductsEnergy((0, $7e68913db756e51f$export$7577c09cb43cc206), molecules);
                energyMin = (0, $134d19e749bf0414$export$96ec731ed4dcb222)(energyMin, energy);
                energyMax = (0, $134d19e749bf0414$export$8960430cfd85939f)(energyMax, energy);
                energies.set(productsLabel, energy);
                if (orders.has(productsLabel)) {
                    i--;
                    let j = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(orders, productsLabel);
                    // Move product to end and shift everything back.
                    orders.forEach(function(value, key) {
                        if (value > j) orders.set(key, value - 1);
                    });
                    // Insert transition states.
                    if (reactionTransitionStates != undefined) {
                        reactionTransitionStates.forEach(function(ts) {
                            let ref = ts.getMolecule().getRef();
                            transitionStates.add(ref);
                            orders.set(ref, i);
                            energy = (0, $7e68913db756e51f$export$7577c09cb43cc206)(ref, molecules).getEnergy() ?? (0, $7e68913db756e51f$export$a94c859b6fc3ec52);
                            energyMin = (0, $134d19e749bf0414$export$96ec731ed4dcb222)(energyMin, energy);
                            energyMax = (0, $134d19e749bf0414$export$8960430cfd85939f)(energyMax, energy);
                            energies.set(ref, energy);
                            i++;
                        });
                        orders.set(productsLabel, i);
                        i++;
                    }
                } else {
                    if (reactionTransitionStates != undefined) reactionTransitionStates.forEach(function(ts) {
                        let ref = ts.getMolecule().getRef();
                        transitionStates.add(ref);
                        orders.set(ref, i);
                        energy = (0, $7e68913db756e51f$export$7577c09cb43cc206)(ref, molecules).getEnergy() ?? (0, $7e68913db756e51f$export$a94c859b6fc3ec52);
                        energyMin = (0, $134d19e749bf0414$export$96ec731ed4dcb222)(energyMin, energy);
                        energyMax = (0, $134d19e749bf0414$export$8960430cfd85939f)(energyMax, energy);
                        energies.set(ref, energy);
                        i++;
                    });
                    orders.set(productsLabel, i);
                    i++;
                }
            }
        });
        //console.log("orders=" + mapToString(orders));
        //console.log("energies=" + mapToString(energies));
        //console.log("energyMax=" + energyMax);
        //console.log("energyMin=" + energyMin);
        let energyRange = energyMax.minus(energyMin).toNumber();
        //console.log("energyRange=" + energyRange);
        //console.log("reactants=" + reactants);
        //console.log("products=" + products);
        //console.log("transitionStates=" + transitionStates);
        // Create a lookup from order to label.
        let reorders = [];
        orders.forEach(function(value, key) {
            reorders[value] = key;
        });
        //console.log("reorders=" + arrayToString(reorders));
        // Iterate through the reorders:
        // 1. Capture coordinates for connecting lines.
        // 2. Store maximum x.
        let x0 = 0;
        let y0;
        let x1;
        let y1;
        let xmax = 0;
        let tw;
        let textSpacing = 5; // Spacing between end of line and start of text.
        let stepSpacing = 10; // Spacing between steps.
        let reactantsInXY = new Map();
        let reactantsOutXY = new Map();
        let productsInXY = new Map();
        let productsOutXY = new Map();
        let transitionStatesInXY = new Map();
        let transitionStatesOutXY = new Map();
        reorders.forEach(function(value) {
            //console.log("value=" + value + ".");
            //console.log("energies=" + mapToString(energies));
            let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
            let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin.toNumber(), energyRange, 0, rdcHeight, energy);
            // Get text width.
            tw = Math.max((0, $e5f7ab5c40db3f0e$export$37827d046293d309)(ctx, energy.toString(), font), (0, $e5f7ab5c40db3f0e$export$37827d046293d309)(ctx, value, font));
            x1 = x0 + tw + textSpacing;
            y0 = energyRescaled + lw;
            y1 = y0;
            // Draw horizontal line and add label.
            // (The drawing is now not done here but done later so labels are on top of lines, but
            // the code is left here commented out for code comprehension.)
            //drawLevel(ctx, green, 4, x0, y0, x1, y1, th, value);
            reactantsInXY.set(value, [
                x0,
                y0
            ]);
            reactantsOutXY.set(value, [
                x1,
                y1
            ]);
            if (products.has(value)) {
                productsInXY.set(value, [
                    x0,
                    y0
                ]);
                productsOutXY.set(value, [
                    x1,
                    y1
                ]);
            }
            if (transitionStates.has(value)) {
                transitionStatesInXY.set(value, [
                    x0,
                    y0
                ]);
                transitionStatesOutXY.set(value, [
                    x1,
                    y1
                ]);
            }
            x0 = x1 + stepSpacing;
            xmax = x1;
        });
        // Set canvas width to maximum x.
        canvas.width = xmax;
        //console.log("canvas.width=" + canvas.width);
        // Set canvas height to maximum energy plus the label.
        let canvasHeightWithBorder = rdcHeight + 4 * th + 2 * lw;
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdcHeight;
        // Update the canvas height.
        canvas.height = canvasHeightWithBorder;
        // Set the transformation matrix.
        //ctx.transform(1, 0, 0, 1, 0, canvasHeightWithBorder);
        ctx.transform(1, 0, 0, -1, 0, canvasHeightWithBorder);
        // Go through reactions and draw connecting lines.
        reactions.forEach(function(reaction, id) {
            //console.log("id=" + id);
            //console.log("reaction=" + reaction);
            // Get TransitionState if there is one.
            let reactionTransitionStates = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            let productsLabel = reaction.getProductsLabel();
            let reactantOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsOutXY, reactantsLabel);
            let productInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsInXY, productsLabel);
            if (reactionTransitionStates.length > 0) reactionTransitionStates.forEach(function(ts) {
                let transitionStateLabel = ts.getMolecule().getRef();
                let transitionStateInXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], transitionStateInXY[0], transitionStateInXY[1]);
                let transitionStateOutXY = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, transitionStateLabel);
                (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, transitionStateOutXY[0], transitionStateOutXY[1], productInXY[0], productInXY[1]);
            });
            else (0, $e5f7ab5c40db3f0e$export$819db45aec5fcbe5)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
        });
        // Draw horizontal lines and labels.
        // (This is done last so that the labels are on top of the vertical lines.)
        reactants.forEach(function(value) {
            let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
            let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(reactantsOutXY, value)[0];
            let energyString = energy.toString();
            (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function(value) {
            let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
            let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(productsOutXY, value)[0];
            let energyString = energy.toString();
            if (intProducts.has(value)) (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
            else (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
        });
        transitionStates.forEach(function(value) {
            let energy = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(energies, value);
            let energyRescaled = (0, $134d19e749bf0414$export$bd2782c820638828)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            let x0 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, $134d19e749bf0414$export$3988ae62b71be9a3)(transitionStatesOutXY, value)[0];
            let energyString = energy.toString();
            (0, $e5f7ab5c40db3f0e$export$479ac392a7fb4419)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
        });
    }
}


//import * as $3Dmol from '$3Dmol'; // Add import statement for $3Dmol library
/**
 * Big.js.
 */ // Set the number toString() format for Big.js. The default is Big.PE = 21, so this change means that Big numbers
// with an order of magnitude of greater than 6 (e.g. 1000000) are presented as 1.0e+7.
(0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports))).PE = 7;
/**
 * The filename of the MESMER XML file.
 */ let $7e68913db756e51f$var$filename;
/**
 * fontSize is set to a relative measure so that component text is resizeable.
 */ let $7e68913db756e51f$var$fontSize = "1.0em";
/**
 * Margins for spacing GUI components.
 */ let $7e68913db756e51f$var$s_0px = "0px";
let $7e68913db756e51f$var$s_1px = "1px";
let $7e68913db756e51f$var$s_25px = "25px";
let $7e68913db756e51f$export$b1ddbf2a116c10ee = {
    marginLeft: $7e68913db756e51f$var$s_0px,
    marginTop: $7e68913db756e51f$var$s_1px,
    marginBottom: $7e68913db756e51f$var$s_1px,
    marginRight: $7e68913db756e51f$var$s_0px
};
let $7e68913db756e51f$export$39c84188a71202f7 = {
    marginLeft: $7e68913db756e51f$var$s_25px,
    marginTop: $7e68913db756e51f$var$s_1px,
    marginBottom: $7e68913db756e51f$var$s_1px,
    marginRight: $7e68913db756e51f$var$s_0px
};
let $7e68913db756e51f$export$d6befed1f1d5e56b = {
    marginLeft: $7e68913db756e51f$var$s_1px,
    marginTop: $7e68913db756e51f$var$s_1px,
    marginBottom: $7e68913db756e51f$var$s_1px,
    marginRight: $7e68913db756e51f$var$s_1px
};
const $7e68913db756e51f$export$9932f6cd2d05a4cf = "\uFF0B"; // ＋
const $7e68913db756e51f$export$96d8a15ea1620cf4 = "\u270E"; // ✎
const $7e68913db756e51f$export$b758aa9bd161846e = " \u2717"; // ✗
//const sy_refresh: string = "\u27F3"; // ⟳
const $7e68913db756e51f$var$sy_remove = "\u2715"; // ✕
const $7e68913db756e51f$export$f0fb6e9d3fd6cf72 = " \u2713"; // ✓
const $7e68913db756e51f$export$1bb8965d05fbf467 = "Add " + $7e68913db756e51f$export$9932f6cd2d05a4cf;
const $7e68913db756e51f$export$b071b08ccb05fd2 = "Add from library " + $7e68913db756e51f$export$9932f6cd2d05a4cf;
const $7e68913db756e51f$export$3e0cc820631ca658 = "Add from spreadsheet " + $7e68913db756e51f$export$9932f6cd2d05a4cf;
const $7e68913db756e51f$var$s_analysis = "analysis";
const $7e68913db756e51f$var$s_conditions = "conditions";
const $7e68913db756e51f$export$7295f538b9762c5 = "container";
const $7e68913db756e51f$var$s_control = "control";
const $7e68913db756e51f$export$666359451816b0e7 = "description";
const $7e68913db756e51f$var$s_graph = "graph";
const $7e68913db756e51f$var$s_menu = "menu";
const $7e68913db756e51f$var$s_metadata = "metadata";
const $7e68913db756e51f$var$s_modelParameters = "modelParameters";
const $7e68913db756e51f$export$d4bce1ca150a4b6a = "molecules";
const $7e68913db756e51f$export$58785e0018b77d4a = "input";
const $7e68913db756e51f$export$50cc31b59b02e033 = "optionOn";
const $7e68913db756e51f$export$d52efe23389358db = "optionOff";
const $7e68913db756e51f$export$ce30911bcd78542 = "reactions";
const $7e68913db756e51f$var$s_reactionsDiagram = "reactionsDiagram";
const $7e68913db756e51f$export$bb916e6caf34db48 = "Remove " + $7e68913db756e51f$var$sy_remove;
const $7e68913db756e51f$export$c1dfed4ad865f0b6 = "save";
const $7e68913db756e51f$export$d8b8827abc8ab7e7 = "Select an option (use keys to cycle through options)...";
const $7e68913db756e51f$export$7a850709da5c4f5b = "table";
const $7e68913db756e51f$var$s_title = "title";
const $7e68913db756e51f$var$s_textarea = "textarea";
const $7e68913db756e51f$export$2f2abd8810196a7 = "undefined";
const $7e68913db756e51f$export$5a13f59b7b9618a3 = "units";
const $7e68913db756e51f$var$s_xml = "xml";
const $7e68913db756e51f$var$s_welcome = "welcome";
/**
 * allIDs is a set of all IDs used in the GUI.
 * This is used to ensure that all IDs are unique.
 * If an ID is not unique, an error is thrown.
 */ const $7e68913db756e51f$var$allIDs = new Set();
/**
 * A set of all IDs to be removed when loading a MESMER file.
 */ const $7e68913db756e51f$var$rIDs = new Set();
function $7e68913db756e51f$export$39722580448f5a99(...parts) {
    let validID = (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(...parts);
    if ($7e68913db756e51f$var$allIDs.has(validID)) throw new Error(validID + " already exists!");
    $7e68913db756e51f$var$allIDs.add(validID);
    //console.log("addID: \"" + validID + "\"");
    return validID;
}
function $7e68913db756e51f$export$bea69a603fae01a6(...parts) {
    let validID = $7e68913db756e51f$export$39722580448f5a99(...parts);
    $7e68913db756e51f$var$rIDs.add(validID);
    return validID;
}
function $7e68913db756e51f$export$cd7f480d6b8286c3(id) {
    let e = document.getElementById(id);
    if (e != null) e.remove();
    $7e68913db756e51f$var$rIDs.delete(id);
    $7e68913db756e51f$var$allIDs.delete(id);
}
const $7e68913db756e51f$export$32f4a893b4a151db = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_menu);
const $7e68913db756e51f$var$titleDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_title);
const $7e68913db756e51f$var$moleculesDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$export$d4bce1ca150a4b6a);
const $7e68913db756e51f$var$reactionsDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$export$ce30911bcd78542);
const $7e68913db756e51f$var$reactionsDiagramDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_reactionsDiagram);
const $7e68913db756e51f$var$conditionsDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_conditions);
const $7e68913db756e51f$var$modelParametersDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_modelParameters);
const $7e68913db756e51f$var$controlDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_control);
const $7e68913db756e51f$var$metadataListDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_metadata);
const $7e68913db756e51f$var$analysisDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_analysis);
const $7e68913db756e51f$var$xmlDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_xml);
const $7e68913db756e51f$var$welcomeDivID = $7e68913db756e51f$export$39722580448f5a99($7e68913db756e51f$var$s_welcome);
// For dark/light mode.
let $7e68913db756e51f$var$dark;
const $7e68913db756e51f$export$a94c859b6fc3ec52 = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(0);
class $7e68913db756e51f$export$e0d5b774927d0e2a {
    /**
     * Adds an ID to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */ addID(iD, ...parts) {
        let id = $7e68913db756e51f$export$bea69a603fae01a6(iD, ...parts);
        if (!this.ids.has(iD)) this.ids.set(iD, new Set());
        this.ids.get(iD)?.add(id);
        return id;
    }
    removeID(iD) {
        $7e68913db756e51f$var$rIDs.delete(iD);
        $7e68913db756e51f$var$allIDs.delete(iD);
    }
    /**
     * Removes the IDs.
     * @param iD The ID key for the IDs to remove.
     */ removeIDs(iD) {
        this.ids.get(iD).forEach((id)=>{
            console.log("remove id " + id);
            $7e68913db756e51f$var$rIDs.delete(id);
            $7e68913db756e51f$var$allIDs.delete(id);
        });
        this.ids.delete(iD);
    }
    constructor(){
        this.ids = new Map();
    }
}
/**
 * For conditions ID management.
 */ let $7e68913db756e51f$var$conditionsIDs = new $7e68913db756e51f$export$e0d5b774927d0e2a();
/**
 * For modelParameters ID management.
 */ let $7e68913db756e51f$var$modelParametersIDs = new $7e68913db756e51f$export$e0d5b774927d0e2a();
/**
 * For control ID management.
 */ let $7e68913db756e51f$var$controlIDs = new $7e68913db756e51f$export$e0d5b774927d0e2a();
let $7e68913db756e51f$export$3bb92be1f57fd129;
let $7e68913db756e51f$export$ebe90cb607ad99e = new (0, $cccccb2a0a919d2e$export$79d0bd4671c1fc67)();
let $7e68913db756e51f$export$7c97c73a2c729cf9 = new Map();
function $7e68913db756e51f$export$ac55d333e780178c(m, ms) {
    let id = m.getID();
    for (let [key, v] of ms)if (id == v.getID()) {
        id += " " + v.id.toString();
        m.label = id;
        break; // Stop iterating
    }
    ms.set(m.id, m);
}
/**
 * A map of molecules with id as key and Molecule as value.
 * The key is a composite of the molecule ID and the index.
 */ let $7e68913db756e51f$var$molecules = new Map();
function $7e68913db756e51f$export$5ac38056c0103baa(molecules) {
    let keys = new Set();
    molecules.forEach((v, k)=>{
        let id = v.getID();
        if (keys.has(id)) keys.add(id + "-" + k.toString());
        else keys.add(id);
    });
    return keys;
}
function $7e68913db756e51f$export$7577c09cb43cc206(label, ms) {
    for (let [key, value] of ms){
        if (value.label == label) return value;
    }
    return null;
}
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let $7e68913db756e51f$var$reactions = new Map();
/**
 * For storing any scatter plots.
 */ let $7e68913db756e51f$var$scatterPlots;
const $7e68913db756e51f$export$196db41cc586e1c = "Reactions Diagram";
const $7e68913db756e51f$var$rdDivID = $7e68913db756e51f$export$bea69a603fae01a6($7e68913db756e51f$export$196db41cc586e1c);
const $7e68913db756e51f$var$rdcID = $7e68913db756e51f$export$bea69a603fae01a6($7e68913db756e51f$var$rdDivID, "Canvas");
//let rd_canvas_width: number = 800;
let $7e68913db756e51f$var$rdcHeight = 400;
let $7e68913db756e51f$var$rd_lw = 4; // Line width of reactants, transition states and products.
let $7e68913db756e51f$var$rd_lwc = 2; // Line width of connectors.
let $7e68913db756e51f$var$rd_font = "1em SensSerif";
let $7e68913db756e51f$var$rdWindow;
// Scatterplot font.
let $7e68913db756e51f$var$sp_font = "2em SensSerif";
/**
 * Once the DOM is loaded, add the menu and collapsed buttons for content
 */ document.addEventListener("DOMContentLoaded", ()=>{
    // Update the page styles based on the user's preference.
    document.body.className = $7e68913db756e51f$var$dark ? "dark-mode" : "light-mode";
    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */ // Initialise mesmer.
    let mesmerAttributes = new Map();
    mesmerAttributes.set("xmlns", "http://www.xml-cml.org/schema");
    mesmerAttributes.set("xmlns:me", "http://www.chem.leeds.ac.uk/mesmer");
    mesmerAttributes.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    $7e68913db756e51f$export$3bb92be1f57fd129 = new (0, $69ecbdaa96f3962d$export$692079bb871c6039)(mesmerAttributes);
    // Create the menu.
    (0, $0ed86fc7e748b547$export$c9a19c59161f09a0)();
    // Title.
    let title = "Example_title";
    let attributes = new Map();
    $7e68913db756e51f$var$createTitle(title, attributes);
    // Molecules.
    let moleculesDiv = document.getElementById($7e68913db756e51f$var$moleculesDivID);
    let mlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName);
    let mlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mlDivID);
    moleculesDiv.appendChild(mlDiv);
    // Create collapsible content.
    let mlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mlDivID, moleculesDiv, null, mlDiv, (0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Add add molecule button.
    let mb = (0, $174b37a7f81f9b54$export$12aafb9570dfb660)(mlDiv, $7e68913db756e51f$var$molecules);
    // Add add from library button.
    let lb = (0, $174b37a7f81f9b54$export$1f1b9bc888fe9f4c)(mlDiv, mb, $7e68913db756e51f$var$molecules);
    // Reactions.
    let reactionsDiv = document.getElementById($7e68913db756e51f$var$reactionsDivID);
    let rlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $69ecbdaa96f3962d$export$44466a39ca846289).tagName);
    let rlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(rlDivID);
    reactionsDiv.appendChild(rlDiv);
    // Create collapsible content.
    let rlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rlDivID, reactionsDiv, null, rlDiv, (0, $69ecbdaa96f3962d$export$44466a39ca846289).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Add add reaction button.
    let rb = (0, $cbb1ac0a822ffab5$export$b12ef0e3d99deb64)(rlDiv, $7e68913db756e51f$var$reactions, $7e68913db756e51f$var$molecules);
    // Reactions Diagram.
    let rddDiv = document.getElementById($7e68913db756e51f$var$reactionsDiagramDivID);
    let rdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$export$39c84188a71202f7);
    rddDiv.appendChild(rdDiv);
    // Create collapsible content.
    let rdcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)($7e68913db756e51f$var$rdDivID, rddDiv, null, rdDiv, $7e68913db756e51f$export$196db41cc586e1c, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    (0, $42d9507eaeb955b6$export$f1b90a337037b551)(rdDiv, $7e68913db756e51f$var$rdcID, $7e68913db756e51f$var$rdcHeight, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc, $7e68913db756e51f$var$rdWindow, $7e68913db756e51f$var$molecules, $7e68913db756e51f$var$reactions, false);
    // Conditions.
    let conditionsDiv = document.getElementById($7e68913db756e51f$var$conditionsDivID);
    let cdlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName);
    let cdlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(cdlDivID);
    conditionsDiv.appendChild(cdlDiv);
    // Create collapsible content.
    let cdlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(cdlDivID, conditionsDiv, null, cdlDiv, "ConditionsList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Model Parameters.
    let modelParametersDiv = document.getElementById($7e68913db756e51f$var$modelParametersDivID);
    let mplDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName, "list");
    let mplDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mplDivID);
    modelParametersDiv.appendChild(mplDiv);
    // Create collapsible content.
    let mplcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mplDivID, modelParametersDiv, null, mplDiv, "ModelParametersList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Control.
    let controlDiv = document.getElementById($7e68913db756e51f$var$controlDivID);
    let clDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName);
    let clDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(clDivID);
    controlDiv.appendChild(clDiv);
    // Create collapsible content.
    let controlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(clDivID, controlDiv, null, clDiv, "ControlList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // MetadataList.
    let metadataListDiv = document.getElementById($7e68913db756e51f$var$metadataListDivID);
    let mdDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
    let mdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(mdDivID);
    metadataListDiv.appendChild(mdDiv);
    // Create collapsible content.
    let mdcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mdDivID, metadataListDiv, null, mdDiv, (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Analysis.
    let analysisDiv = document.getElementById($7e68913db756e51f$var$analysisDivID);
    let aDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
    let aDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(aDivID);
    analysisDiv.appendChild(aDiv);
    // Create collapsible content.
    let acDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(aDivID, analysisDiv, null, aDiv, (0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // XML.
    let xmlDiv = document.getElementById($7e68913db756e51f$var$xmlDivID);
    let xDivID = $7e68913db756e51f$export$bea69a603fae01a6($7e68913db756e51f$var$s_xml, 2);
    let xDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(xDivID);
    xmlDiv.appendChild(xDiv);
    // Create collapsible content.
    let xcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(xDivID, xmlDiv, null, xDiv, $7e68913db756e51f$var$s_xml, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
});
/**
 * Create the title input.
 */ function $7e68913db756e51f$var$createTitle(title, attributes) {
    let titleNode = new (0, $69ecbdaa96f3962d$export$f99233281efd08a0)(attributes, title);
    $7e68913db756e51f$export$3bb92be1f57fd129.setTitle(titleNode);
    let titleDiv = document.getElementById($7e68913db756e51f$var$titleDivID);
    let lwiId = $7e68913db756e51f$export$bea69a603fae01a6("titleDiv");
    // Remove any existing lwiId HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(lwiId);
    // Create input element.
    let lwi = (0, $f0396edd0a5c99f7$export$4e9ec2b27757d9dd)("text", $7e68913db756e51f$export$bea69a603fae01a6(lwiId, $7e68913db756e51f$export$58785e0018b77d4a), $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee, (event)=>{
        let target = event.target;
        titleNode.value = target.value;
        console.log(titleNode.tagName + " changed to " + titleNode.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    }, title, (0, $69ecbdaa96f3962d$export$f99233281efd08a0).tagName);
    lwi.id = lwiId;
    titleDiv.appendChild(lwi);
}
/**
 * Redraw the reactions diagram.
 */ function $7e68913db756e51f$var$redrawReactionsDiagram() {
    if ($7e68913db756e51f$var$rdWindow == null) {
        let rdCanvas = document.getElementById($7e68913db756e51f$var$rdcID);
        (0, $42d9507eaeb955b6$export$9a6a0a663dda2923)(rdCanvas, $7e68913db756e51f$var$rdcHeight, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc, $7e68913db756e51f$var$molecules, $7e68913db756e51f$var$reactions);
    } else {
        let c = $7e68913db756e51f$var$rdWindow.document.getElementById($7e68913db756e51f$var$rdcID);
        (0, $42d9507eaeb955b6$export$9a6a0a663dda2923)(c, $7e68913db756e51f$var$rdcHeight, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc, $7e68913db756e51f$var$molecules, $7e68913db756e51f$var$reactions);
    }
}
/**
 * Redraw any scatterplots.
 */ function $7e68913db756e51f$var$redrawScatterPlots() {
    $7e68913db756e51f$var$scatterPlots.forEach((scatterPlot)=>{
        scatterPlot.draw($7e68913db756e51f$var$sp_font);
    });
}
function $7e68913db756e51f$export$11e63f7b0f3d9900() {
    // Before loading a new file, remove any existing content and initialise any data containers.
    $7e68913db756e51f$var$rIDs.forEach((id)=>{
        $7e68913db756e51f$export$cd7f480d6b8286c3(id);
    });
    if ($7e68913db756e51f$var$molecules != null) $7e68913db756e51f$var$molecules.clear();
    if ($7e68913db756e51f$var$reactions != null) $7e68913db756e51f$var$reactions.clear();
    $7e68913db756e51f$var$scatterPlots = [];
    // Create a file input element to prompt the user to select a file.
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = function() {
        if (input.files) {
            for(let i = 0; i < input.files.length; i++)console.log("inputElement.files[" + i + "]=" + input.files[i]);
            let file = input.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            $7e68913db756e51f$var$filename = file.name;
            let reader = new FileReader();
            let chunkSize = 1048576; // 1MB
            let start = 0;
            let contents = "";
            reader.onload = function(e) {
                if (e.target == null) throw new Error("Event target is null");
                contents += e.target.result;
                if (file != null) {
                    if (start < file.size) {
                        // Read the next chunk
                        let blob = file.slice(start, start + chunkSize);
                        reader.readAsText(blob);
                        start += chunkSize;
                    } else {
                        // All chunks have been read
                        contents = contents.trim();
                        $7e68913db756e51f$var$displayXML($7e68913db756e51f$var$filename, contents);
                        let parser = new DOMParser();
                        let xml = parser.parseFromString(contents, "text/xml");
                        $7e68913db756e51f$var$parse(xml);
                    }
                }
            };
            // Read the first chunk
            let blob = file.slice(start, start + chunkSize);
            reader.readAsText(blob);
            start += chunkSize;
        }
    };
    input.click();
}
/**
 * Parse an XMLDocument and create the mesmer object.
 * @param xml The XML.
 */ function $7e68913db756e51f$var$parse(xml) {
    console.log("parse: " + xml);
    // Process the XML.
    let xml_mesmer = (0, $cc8c7201a9bad777$export$b7531b8ff18dc588)(xml, (0, $69ecbdaa96f3962d$export$692079bb871c6039).tagName);
    $7e68913db756e51f$export$3bb92be1f57fd129 = new (0, $69ecbdaa96f3962d$export$692079bb871c6039)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName((0, $69ecbdaa96f3962d$export$f99233281efd08a0).tagName);
    let title;
    let attributes;
    if (xml_title.length > 0) {
        if (xml_title.length > 1) console.warn("Multiple " + (0, $69ecbdaa96f3962d$export$f99233281efd08a0).tagName + " tags found, using the first.");
        title = xml_title[0].childNodes[0].nodeValue.trim();
        attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_title[0]);
    } else {
        title = $7e68913db756e51f$var$filename;
        console.warn("No " + (0, $69ecbdaa96f3962d$export$f99233281efd08a0).tagName + " tag found, using the filename: " + $7e68913db756e51f$var$filename + " as the title.");
        attributes = new Map();
    }
    $7e68913db756e51f$var$createTitle(title, attributes);
    // Molecules.
    let mlDiv = document.getElementById($7e68913db756e51f$var$moleculesDivID);
    let mlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName);
    // Remove any existing mlDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(mlDivID);
    // Create collapsible content.
    let mlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mlDivID, mlDiv, null, (0, $174b37a7f81f9b54$export$ce852d72abd87240)(xml, $7e68913db756e51f$var$molecules), (0, $69ecbdaa96f3962d$export$19d70f3647dee606).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    //document.body.appendChild(mlcDiv);
    // Reactions.
    let rlDiv = document.getElementById($7e68913db756e51f$var$reactionsDivID);
    let rlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $69ecbdaa96f3962d$export$44466a39ca846289).tagName);
    // Remove any existing rlDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(rlDivID);
    // Create collapsible content.
    let rlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rlDivID, rlDiv, null, (0, $cbb1ac0a822ffab5$export$ef4959ac45646090)(xml, $7e68913db756e51f$var$reactions), (0, $69ecbdaa96f3962d$export$44466a39ca846289).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Reactions Diagram.
    let rddDiv = document.getElementById($7e68913db756e51f$var$reactionsDiagramDivID);
    let rdDivID = $7e68913db756e51f$export$bea69a603fae01a6($7e68913db756e51f$export$196db41cc586e1c);
    // Destroy any existing rdWindow.
    if ($7e68913db756e51f$var$rdWindow != null) {
        $7e68913db756e51f$var$rdWindow.close();
        $7e68913db756e51f$var$rdWindow = null;
    }
    // If rdDiv already exists, remove it.
    $7e68913db756e51f$export$cd7f480d6b8286c3(rdDivID);
    // Create collapsible content.
    let rdDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$export$39c84188a71202f7);
    let rdcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rdDivID, rddDiv, null, rdDiv, $7e68913db756e51f$export$196db41cc586e1c, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    (0, $42d9507eaeb955b6$export$f1b90a337037b551)(rdDiv, $7e68913db756e51f$var$rdcID, $7e68913db756e51f$var$rdcHeight, $7e68913db756e51f$var$dark, $7e68913db756e51f$var$rd_font, $7e68913db756e51f$var$rd_lw, $7e68913db756e51f$var$rd_lwc, $7e68913db756e51f$var$rdWindow, $7e68913db756e51f$var$molecules, $7e68913db756e51f$var$reactions, true);
    // Conditions.
    let cdlDiv = document.getElementById($7e68913db756e51f$var$conditionsDivID);
    let cdlDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $754b7c8446bbe616$export$363c7374d425f4ad).tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(cdlDivID);
    // Create collapsible content.
    let cdlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(cdlDivID, cdlDiv, null, (0, $589572943861997b$export$120facc5efd57974)(xml, $7e68913db756e51f$var$conditionsIDs, $7e68913db756e51f$var$molecules), "ConditionsList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Model Parameters.
    let mplDiv = document.getElementById($7e68913db756e51f$var$modelParametersDivID);
    let mplDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $f7e4eb4e898217f9$export$77f098867dc64198).tagName, "list");
    // Remove any existing mpDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(mplDivID);
    // Create collapsible content.
    let mplcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mplDivID, mplDiv, null, (0, $dde1c59fe054f706$export$7502110c3a5d7b36)(xml, $7e68913db756e51f$var$modelParametersIDs), "ModelParametersList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Control.
    let clDiv = document.getElementById($7e68913db756e51f$var$controlDivID);
    let clDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $08d0a8a73bf11acb$export$7a7fa4424cb20976).tagName);
    // Remove any existing clDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(clDivID);
    // Create collapsible content.
    let controlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(clDivID, clDiv, null, (0, $180486e70a03b1bd$export$76caf53413cf3464)(xml, $7e68913db756e51f$var$controlIDs), "ControlList", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // MetadataList.
    let mdDiv = document.getElementById($7e68913db756e51f$var$metadataListDivID);
    let mdDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
    // Remove any existing mdDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(mdDivID);
    // Create collapsible content.
    let mdcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(mdDivID, mdDiv, null, $7e68913db756e51f$var$processMetadataList(xml), (0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    // Analysis.
    let aDiv = document.getElementById($7e68913db756e51f$var$analysisDivID);
    let aDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
    // Remove any existing aDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(aDivID);
    // Create collapsible content.
    let acDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(aDivID, aDiv, null, $7e68913db756e51f$var$processAnalysis(xml), (0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
}
function $7e68913db756e51f$export$8f4af86541f72bfe(className, optionToRemove) {
    let elements = document.getElementsByClassName(className);
    for(let i = 0; i < elements.length; i++)if (elements[i] instanceof HTMLSelectElement) {
        let options = elements[i].options;
        let selectValue = elements[i].value;
        Array.from(options).forEach((option)=>{
            if (option.value == optionToRemove) {
                option.remove();
                if (selectValue == optionToRemove) {
                    // Create a new event
                    let event = new Event("change");
                    // Dispatch the event
                    elements[i].dispatchEvent(event);
                }
            }
        });
    }
}
function $7e68913db756e51f$export$a30e0f90a7434924(className, optionToAdd) {
    let elements = document.getElementsByClassName(className);
    console.log("n elements with className " + className + "=" + elements.length);
    for(let i = 0; i < elements.length; i++){
        let select = elements[i];
        if (elements[i] instanceof HTMLSelectElement) {
            let option = document.createElement("option");
            option.value = optionToAdd;
            option.text = optionToAdd;
            select.add(option);
        }
    }
}
function $7e68913db756e51f$export$56da8d49d79e2ff7(dictRef, ps, id, boundary, level) {
    let pDiv = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, level);
    pDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(dictRef, boundary));
    // value.
    let value = ps.getValue();
    //let value: string = ps.value;
    let valueInputId = $7e68913db756e51f$export$bea69a603fae01a6(id, $7e68913db756e51f$export$58785e0018b77d4a);
    let valueInput = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", valueInputId, boundary);
    pDiv.appendChild(valueInput);
    valueInput.addEventListener("change", (event)=>{
        let target = event.target;
        ps.setValue(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
        //ps.value = target.value;
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    valueInput.value = value.toString();
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(valueInput);
    return pDiv;
}
function $7e68913db756e51f$export$f729a71031e2cfe2(attributes, iDs, value, units, pl, p, plDiv, boundary) {
    let ps = p.getProperty();
    ps.setValue = (function(value) {
        ps.value = value;
        if (p.dictRef == (0, $01410cda1eef5011$export$95174cf0748f45cd).dictRef) // Update the molecule energy diagram.
        $7e68913db756e51f$var$redrawReactionsDiagram();
    }).bind(ps);
    ps.value = value;
    if (p.dictRef == (0, $01410cda1eef5011$export$95174cf0748f45cd).dictRef) // Update the molecule energy diagram.
    $7e68913db756e51f$var$redrawReactionsDiagram();
    let id = $7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef);
    console.log("div ID " + id);
    let div = $7e68913db756e51f$export$17d48ee8ddbf2d44(id, iDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, ()=>pl.removeProperty(p.dictRef), $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
    console.log("unitsID " + $7e68913db756e51f$export$bea69a603fae01a6(id, (0, $01410cda1eef5011$export$742f9ce317ef8ba3).s_units));
    $7e68913db756e51f$export$2b2254f82abcc900(units, attributes, div, div.querySelector($7e68913db756e51f$export$58785e0018b77d4a), (0, $134d19e749bf0414$export$3205c97bcf96f7dc)(id, (0, $01410cda1eef5011$export$742f9ce317ef8ba3).s_units), p.dictRef, boundary, boundary);
    plDiv.appendChild(div);
}
function $7e68913db756e51f$export$10de1fc8385eec4a(options, add) {
    if (add) options.push($7e68913db756e51f$export$d8b8827abc8ab7e7);
    else {
        // remove selectOption if present.
        let index = options.indexOf($7e68913db756e51f$export$d8b8827abc8ab7e7);
        if (index > -1) options.splice(index, 1);
    }
}
function $7e68913db756e51f$export$17d48ee8ddbf2d44(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, margin);
    let buttonTextContentSelected = name + $7e68913db756e51f$export$f0fb6e9d3fd6cf72;
    let buttonTextContentDeselected = name + $7e68913db756e51f$export$b758aa9bd161846e;
    let idb = $7e68913db756e51f$export$bea69a603fae01a6(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e));
    iDs.add(idb);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$export$50cc31b59b02e033);
    button.classList.add($7e68913db756e51f$export$d52efe23389358db);
    let inputId = $7e68913db756e51f$export$bea69a603fae01a6(id, name, $7e68913db756e51f$export$58785e0018b77d4a);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
    } else {
        $7e68913db756e51f$var$addNumber(div, inputId, name, value, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(inputId) == null) {
            $7e68913db756e51f$var$addNumber(div, inputId, name, value, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */ function $7e68913db756e51f$var$addNumber(div, id, name, value, getter, setter, boundary) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value.toString();
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", id, boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        try {
            setter(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(target.value));
            console.log(name + " changed from " + value + " to " + target.value);
        } catch (e) {
            alert("Input invalid, resetting...");
            target.value = getter().toString();
        }
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Process a numerical variable.
 * @param div The div.
 * @param id The id.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */ function $7e68913db756e51f$var$processNumberArray(id, name, pa, getter, setter, remover, marginComponent, margin) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(undefined, margin);
    let buttonTextContentSelected = name + $7e68913db756e51f$export$f0fb6e9d3fd6cf72;
    let buttonTextContentDeselected = name + $7e68913db756e51f$export$b758aa9bd161846e;
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, $7e68913db756e51f$export$bea69a603fae01a6(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e)), marginComponent);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$export$50cc31b59b02e033);
    button.classList.add($7e68913db756e51f$export$d52efe23389358db);
    let inputId = $7e68913db756e51f$export$bea69a603fae01a6(id, name, $7e68913db756e51f$export$58785e0018b77d4a);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
    } else {
        $7e68913db756e51f$var$addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(inputId) == null) {
            $7e68913db756e51f$var$addNumberArray(div, inputId, name, value, pa, getter, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */ function $7e68913db756e51f$var$addNumberArray(div, id, name, values, pa, getter, setter, boundary) {
    let valueString;
    if (values == undefined) valueString = "";
    else valueString = (0, $134d19e749bf0414$export$dba422ef505af222)(values);
    let ta = (0, $f0396edd0a5c99f7$export$5b32cb28d9a29894)(id, boundary);
    ta.addEventListener("change", (event)=>{
        let target = event.target;
        $7e68913db756e51f$export$819b5ff7dff3652c(pa, ta);
        (0, $f0396edd0a5c99f7$export$c5eaaac137ef25d0)(target);
    });
    ta.value = valueString;
    (0, $f0396edd0a5c99f7$export$c5eaaac137ef25d0)(ta);
    div.appendChild(ta);
}
function $7e68913db756e51f$export$590bdcb7f5f5327a(div, margin, removeFunction, ...args) {
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)($7e68913db756e51f$export$bb916e6caf34db48, undefined, margin);
    div.appendChild(button);
    button.addEventListener("click", ()=>{
        removeFunction(...args);
        div.remove();
        $7e68913db756e51f$export$cd7f480d6b8286c3(div.id);
    });
    return button;
}
/**
 * Process a numerical variable.
 * @param id The id.
 * @param iDs The set of IDs to add to.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */ function $7e68913db756e51f$var$processString(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, $f0396edd0a5c99f7$export$78253536c0178a32)(id, margin);
    let buttonTextContentSelected = name + $7e68913db756e51f$export$f0fb6e9d3fd6cf72;
    let buttonTextContentDeselected = name + $7e68913db756e51f$export$b758aa9bd161846e;
    let idb = $7e68913db756e51f$export$bea69a603fae01a6(id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e));
    iDs.add(idb);
    let button = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add($7e68913db756e51f$export$50cc31b59b02e033);
    button.classList.add($7e68913db756e51f$export$d52efe23389358db);
    let inputId = $7e68913db756e51f$export$bea69a603fae01a6(id, name, $7e68913db756e51f$export$58785e0018b77d4a);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
    } else {
        $7e68913db756e51f$var$addString(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    }
    // Add event listener for the button.
    button.addEventListener("click", (event)=>{
        if (document.getElementById(inputId) == null) {
            $7e68913db756e51f$var$addString(div, inputId, name, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // 
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle($7e68913db756e51f$export$50cc31b59b02e033);
        button.classList.toggle($7e68913db756e51f$export$d52efe23389358db);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param boundary The boundary.
 * @param level The level.
 */ function $7e68913db756e51f$var$addString(div, id, name, value, setter, boundary) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value.toString();
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, $f0396edd0a5c99f7$export$d80fffb1deb3b97e)("text", id, boundary);
    input.addEventListener("change", (event)=>{
        let target = event.target;
        setter(target.value);
        console.log(name + " changed from " + value + " to " + target.value);
        (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(target);
    });
    input.value = valueString;
    (0, $f0396edd0a5c99f7$export$d43d96a9a8ad3e51)(input);
    div.appendChild(input);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function $7e68913db756e51f$var$displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById($7e68913db756e51f$var$xmlDivID);
    let xml2DivID = $7e68913db756e51f$export$bea69a603fae01a6($7e68913db756e51f$var$xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    $7e68913db756e51f$export$cd7f480d6b8286c3(xml2DivID);
    // Create collapsible content.
    let xml2Div = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(xml2DivID, $7e68913db756e51f$export$39c84188a71202f7);
    let xmlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(xml2DivID, xmlDiv, null, xml2Div, xmlFilename, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xml2Div.appendChild(xmlPre);
}
function $7e68913db756e51f$export$2aabceac90b71d10(pl, p, units, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName((0, $01410cda1eef5011$export$742f9ce317ef8ba3).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$742f9ce317ef8ba3).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(scalarNodes[0]);
        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(inputString);
        let psAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, $01410cda1eef5011$export$742f9ce317ef8ba3)(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = (function(value) {
            ps.value = value;
            if (p.dictRef == (0, $01410cda1eef5011$export$95174cf0748f45cd).dictRef) // Update the molecule energy diagram.
            $7e68913db756e51f$var$redrawReactionsDiagram();
        }).bind(ps);
        let div = $7e68913db756e51f$export$17d48ee8ddbf2d44($7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, ()=>pl.removeProperty(p.dictRef), $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
        $7e68913db756e51f$export$2b2254f82abcc900(units, psAttributes, div, div.querySelector($7e68913db756e51f$export$58785e0018b77d4a), $7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef, (0, $01410cda1eef5011$export$742f9ce317ef8ba3).s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(div);
    } else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName((0, $01410cda1eef5011$export$9f93a3fdf2490572).tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$9f93a3fdf2490572).tagName + " but finding " + arrayNodes.length + "!");
            let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(arrayNodes[0]);
            if (inputString != "") {
                let values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                let paAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(arrayNodes[0]);
                let pa = new (0, $01410cda1eef5011$export$9f93a3fdf2490572)(paAttributes, values);
                p.setProperty(pa);
                let div = $7e68913db756e51f$var$processNumberArray($7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef), p.dictRef, pa, pa.getValues.bind(pa), pa.setValues, ()=>pl.removeProperty(p.dictRef), $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
                $7e68913db756e51f$export$2b2254f82abcc900(units, paAttributes, div, div.querySelector($7e68913db756e51f$var$s_textarea), $7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef, (0, $01410cda1eef5011$export$9f93a3fdf2490572).s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(div);
            }
        } else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName((0, $01410cda1eef5011$export$a5a2be813176eb0e).tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$a5a2be813176eb0e).tagName + " but finding " + matrixNodes.length + "!");
                let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(matrixNodes[0]);
                let values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                let pmAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(matrixNodes[0]);
                let pm = new (0, $01410cda1eef5011$export$a5a2be813176eb0e)(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, $f0396edd0a5c99f7$export$60fee6710ef6fb16)($7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef), boundary, level, (event)=>{
                    let target = event.target;
                    $7e68913db756e51f$export$819b5ff7dff3652c(pm, target);
                }, inputString, label);
                let ta = inputDiv.querySelector("textarea");
                ta.value = inputString;
                (0, $f0396edd0a5c99f7$export$c5eaaac137ef25d0)(ta);
                ta.addEventListener("change", (event)=>{
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, $134d19e749bf0414$export$8cfbaad830aa9e0a)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    (0, $f0396edd0a5c99f7$export$c5eaaac137ef25d0)(ta);
                });
                $7e68913db756e51f$export$2b2254f82abcc900(units, pmAttributes, inputDiv, ta, $7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef, (0, $f0396edd0a5c99f7$export$8797b0c8298d191), "Units"), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            } else throw new Error("Expecting " + (0, $01410cda1eef5011$export$742f9ce317ef8ba3).tagName + ", " + (0, $01410cda1eef5011$export$9f93a3fdf2490572).tagName + " or " + (0, $01410cda1eef5011$export$a5a2be813176eb0e).tagName + " but finding none!");
        }
    }
}
function $7e68913db756e51f$export$9d37ed1c0ac75637(pl, p, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalarString.
    let scalarNodes = element.getElementsByTagName((0, $01410cda1eef5011$export$eb6936faa5f138bb).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, $01410cda1eef5011$export$eb6936faa5f138bb).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, $cc8c7201a9bad777$export$433c819efd6b1ea5)(scalarNodes[0]);
        let psAttributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, $01410cda1eef5011$export$eb6936faa5f138bb)(psAttributes, inputString);
        p.setProperty(ps);
        ps.setValue = (function(value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + value);
            if (p.dictRef == (0, $01410cda1eef5011$export$95174cf0748f45cd).dictRef) // Update the molecule energy diagram.
            $7e68913db756e51f$var$redrawReactionsDiagram();
        }).bind(ps);
        let div = $7e68913db756e51f$var$processString($7e68913db756e51f$export$bea69a603fae01a6(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, ()=>pl.removeProperty(p.dictRef), $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
        plDiv.appendChild(div);
    } else console.log("Expecting " + (0, $01410cda1eef5011$export$eb6936faa5f138bb).tagName + " but finding none!");
}
function $7e68913db756e51f$export$2b2254f82abcc900(units, attributes, divToAddTo, elementToInsertBefore, id, tagOrDictRef, boundary, level) {
    if (units != undefined) {
        let lws = $7e68913db756e51f$var$getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level);
        if (lws != undefined) divToAddTo.insertBefore(lws, elementToInsertBefore);
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, $f0396edd0a5c99f7$export$f2839682b8c07f35)("units " + attributesUnits, level);
            divToAddTo.insertBefore(label, elementToInsertBefore);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function $7e68913db756e51f$var$getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, $f0396edd0a5c99f7$export$4c3eba01cd3c5ba4)("units", units, "units", psUnits, id, boundary, level);
        let select = lws.querySelector("select");
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(select);
        select.addEventListener("change", (event)=>{
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            (0, $f0396edd0a5c99f7$export$fdd146df37959fe8)(target);
        });
        return lws;
    }
    return undefined;
}
function $7e68913db756e51f$export$819b5ff7dff3652c(node, ta) {
    let inputString = ta.value.trim();
    let originalValues = (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ");
    if (inputString == "") {
        alert("Empty input resetting...");
        ta.value = originalValues;
        return;
    }
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function(value) {
        if (!(0, $134d19e749bf0414$export$e90fb89750dba83f)(value)) success = false;
        else values.push(new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        ta.value = originalValues;
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        node.setValues(values);
        console.log("Changed " + node.tagName + ' from: "' + originalValues + '" to: "' + (0, $134d19e749bf0414$export$4323cc4280d5be7)(node.values, " ") + '"');
    //console.log("molecule=" + molecule);
    } else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        ta.value = originalValues;
    }
}
function $7e68913db756e51f$export$b1e4cbf5b56e0e21(node, input) {
    try {
        let value = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(input.value);
        //node.setValue(value);
        node.value = value;
    } catch (e) {
        alert("Value invalid, resetting...");
    }
    input.value = node.value.toString();
}
function $7e68913db756e51f$export$3b08dcba56872ec6(options, select) {
    select.addEventListener("click", (event)=>{
        if (options[options.length - 1] == $7e68913db756e51f$export$d8b8827abc8ab7e7) options.pop();
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == $7e68913db756e51f$export$d8b8827abc8ab7e7) select.remove(lastIndex);
    });
}
/**
 * Parses xml to initialise metadataList.
 * @param xml The XML document.
 */ function $7e68913db756e51f$var$processMetadataList(xml) {
    console.log((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
    let mlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$export$bea69a603fae01a6((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName, 0), $7e68913db756e51f$export$d6befed1f1d5e56b);
    let xml_mls = xml.getElementsByTagName((0, $97ed023cfe5af5b8$export$3e18a603070a78a).tagName);
    if (xml_mls.length > 0) {
        if (xml_mls.length > 1) throw new Error("More than one MetadataList element.");
        let ml = new (0, $97ed023cfe5af5b8$export$3e18a603070a78a)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_mls[0]));
        $7e68913db756e51f$export$3bb92be1f57fd129.setMetadataList(ml);
        function handleElement(tagName, constructor, setter) {
            let xml_elements = xml_mls[0].getElementsByTagName(tagName);
            if (xml_elements.length > 0) {
                if (xml_elements.length == 1) {
                    let s = (0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_elements[0])?.nodeValue ?? "";
                    let n = new constructor((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_elements[0]), s);
                    let cDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(undefined, $7e68913db756e51f$export$39c84188a71202f7);
                    mlDiv.appendChild(cDiv);
                    cDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(n.tagName + " " + s, $7e68913db756e51f$export$d6befed1f1d5e56b));
                    //console.log(n.tagName + " " + s);
                    setter.call(ml, n);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        handleElement((0, $97ed023cfe5af5b8$export$c78a95f4a27bad68).tagName, (0, $97ed023cfe5af5b8$export$c78a95f4a27bad68), ml.setSource);
        handleElement((0, $97ed023cfe5af5b8$export$61180682f135a7f2).tagName, (0, $97ed023cfe5af5b8$export$61180682f135a7f2), ml.setCreator);
        handleElement((0, $97ed023cfe5af5b8$export$bf6d63a1cea4a33c).tagName, (0, $97ed023cfe5af5b8$export$bf6d63a1cea4a33c), ml.setDate);
        handleElement((0, $97ed023cfe5af5b8$export$2b747e617c849cca).tagName, (0, $97ed023cfe5af5b8$export$2b747e617c849cca), ml.setContributor);
    }
    return mlDiv;
}
/**
 * Parses xml to initialise analysis.
 * @param xml The XML document.
 */ function $7e68913db756e51f$var$processAnalysis(xml) {
    console.log((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
    let aDivID = $7e68913db756e51f$export$bea69a603fae01a6((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName, 0);
    let aDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(aDivID, $7e68913db756e51f$export$d6befed1f1d5e56b);
    let xml_as = xml.getElementsByTagName((0, $6bf90154944bce56$export$c4c153dc94cc96b4).tagName);
    if (xml_as.length > 0) {
        if (xml_as.length > 1) throw new Error("More than one Analysis element.");
        let a = new (0, $6bf90154944bce56$export$c4c153dc94cc96b4)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_as[0]));
        $7e68913db756e51f$export$3bb92be1f57fd129.setAnalysis(a);
        // "me:description".
        let xml_d = xml_as[0].getElementsByTagName((0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName);
        if (xml_d.length > 0) {
            if (xml_d.length == 1) {
                let s = (0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_d[0])?.nodeValue ?? "";
                let d = new (0, $69ecbdaa96f3962d$export$393edc798c47379d)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_d[0]), s);
                let dDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$export$bea69a603fae01a6(aDivID, (0, $69ecbdaa96f3962d$export$393edc798c47379d).tagName), $7e68913db756e51f$export$39c84188a71202f7);
                aDiv.appendChild(dDiv);
                dDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)(d.tagName + " " + s, $7e68913db756e51f$export$d6befed1f1d5e56b));
                a.setDescription(d);
            } else throw new Error("More than one Description element.");
        }
        // "me:eigenvalueList".
        let xml_el = xml_as[0].getElementsByTagName((0, $6bf90154944bce56$export$f681829d43cbf50e).tagName);
        // Create a new collapsible div for the EigenvalueLists.
        let elDivID = $7e68913db756e51f$export$bea69a603fae01a6(aDivID, (0, $6bf90154944bce56$export$f681829d43cbf50e).tagName);
        let elDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(elDivID, $7e68913db756e51f$export$39c84188a71202f7);
        let elcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(elDivID, aDiv, null, elDiv, (0, $6bf90154944bce56$export$f681829d43cbf50e).tagName + "s", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
        if (xml_el.length > 0) for(let i = 0; i < xml_el.length; i++){
            let el_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_el[i]);
            let el = new (0, $6bf90154944bce56$export$f681829d43cbf50e)(el_attributes);
            let labelText = el.tagName + " " + i.toString() + " " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(el_attributes);
            // Create a new collapsible div for the EigenvalueList.
            let eDivID = $7e68913db756e51f$export$bea69a603fae01a6(elDiv.id, i.toString());
            let eDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(elDivID, $7e68913db756e51f$export$39c84188a71202f7);
            let ecDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(eDivID, elDiv, null, eDiv, labelText, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
            //eDiv.appendChild(createLabel(labelText, boundary1));
            a.addEigenvalueList(el);
            // "me:eigenvalue".
            let evs = [];
            let xml_ei = xml_el[i].getElementsByTagName((0, $6bf90154944bce56$export$877cee35188549c7).tagName);
            if (xml_ei.length > 0) for(let j = 0; j < xml_ei.length; j++){
                let ev = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_ei[j])?.nodeValue);
                evs.push(ev);
                el.addEigenvalue(new (0, $6bf90154944bce56$export$877cee35188549c7)((0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_ei[j]), ev));
            }
            eDiv.appendChild((0, $f0396edd0a5c99f7$export$f2839682b8c07f35)((0, $134d19e749bf0414$export$4323cc4280d5be7)(evs, ", "), $7e68913db756e51f$export$d6befed1f1d5e56b));
        }
        // "me:populationList".
        let xml_pl = xml_as[0].getElementsByTagName((0, $6bf90154944bce56$export$8f9a53be9a409418).tagName);
        // Create a new collapsible div for the PopulationLists.
        let plDivID = $7e68913db756e51f$export$bea69a603fae01a6(aDivID, (0, $6bf90154944bce56$export$8f9a53be9a409418).tagName);
        let plDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(plDivID, $7e68913db756e51f$export$39c84188a71202f7);
        let plcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(plDivID, aDiv, null, plDiv, (0, $6bf90154944bce56$export$8f9a53be9a409418).tagName + "s", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
        if (xml_pl.length > 0) // Create a new collapsible div for the PopulationList.
        for(let i = 0; i < xml_pl.length; i++){
            let pl_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pl[i]);
            let T = pl_attributes.get("T") != undefined ? new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(pl_attributes.get("T")) : $7e68913db756e51f$export$a94c859b6fc3ec52;
            let conc = pl_attributes.get("conc") != undefined ? new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(pl_attributes.get("conc")) : $7e68913db756e51f$export$a94c859b6fc3ec52;
            let pl = new (0, $6bf90154944bce56$export$8f9a53be9a409418)(pl_attributes);
            let labelText = pl.tagName + " " + i.toString() + " " + (0, $134d19e749bf0414$export$dc22ec7f8e0b9ac)(pl_attributes);
            let plDivID = $7e68913db756e51f$export$bea69a603fae01a6(aDiv.id, (0, $6bf90154944bce56$export$8f9a53be9a409418).tagName, i.toString());
            // Create a new collapsible div for the EigenvalueList.
            let pDivID = $7e68913db756e51f$export$bea69a603fae01a6(plDivID, i.toString());
            let pDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(plDivID, $7e68913db756e51f$export$39c84188a71202f7);
            let pcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(pDivID, plDiv, null, pDiv, labelText, $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$b1ddbf2a116c10ee);
            a.addPopulationList(pl);
            // "me:population".
            //let lt_ref_pop : Map<Big, Map<string, Big>> = new Map(); // Change to calculate the log of the time when creating the plots.
            let t_ref_pop = new Map();
            let refs = [];
            refs.push("time");
            let xml_pn = xml_pl[i].getElementsByTagName((0, $6bf90154944bce56$export$9764fff2991ff94a).tagName);
            if (xml_pn.length > 0) for(let j = 0; j < xml_pn.length; j++){
                let pn_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pn[j]);
                let population = new (0, $6bf90154944bce56$export$9764fff2991ff94a)(pn_attributes, []);
                pl.addPopulation(population);
                let t = pn_attributes.get("time") != undefined ? new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(pn_attributes.get("time")) : $7e68913db756e51f$export$a94c859b6fc3ec52;
                //let lt: Big = pn_attributes.get("logTime") != undefined ? new Big(pn_attributes.get("logTime") as string) : big0; 
                let ref_pop = new Map();
                //lt_ref_pop.set(lt, ref_pop);
                t_ref_pop.set(t, ref_pop);
                let xml_pop = xml_pn[j].getElementsByTagName((0, $6bf90154944bce56$export$910c21a5819ebc2e).tagName);
                if (xml_pop.length > 0) for(let k = 0; k < xml_pop.length; k++){
                    let pop_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_pop[k]);
                    let ref = pop_attributes.get("ref");
                    if (j == 0) refs.push(ref);
                    let p = new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_pop[k])?.nodeValue);
                    let pop = new (0, $6bf90154944bce56$export$910c21a5819ebc2e)(pop_attributes, p);
                    population.addPop(pop);
                    ref_pop.set(ref, p);
                }
            }
            // Create graph.
            let graphDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$export$bea69a603fae01a6(pDivID, $7e68913db756e51f$var$s_graph), $7e68913db756e51f$export$d6befed1f1d5e56b);
            pDiv.appendChild(graphDiv);
            let canvas = document.createElement("canvas");
            graphDiv.appendChild(canvas);
            // Create an scatter plot.
            let scatterPlot = new $7e68913db756e51f$var$ScatterPlot(canvas, t_ref_pop, $7e68913db756e51f$var$sp_font);
            // Add the scatter plot to the collection.
            $7e68913db756e51f$var$scatterPlots.push(scatterPlot);
            //scatterPlot.draw();
            // Add a save to PNG button.
            $7e68913db756e51f$export$f0119d1c38383eb8(canvas, pDiv, graphDiv, labelText);
            // Create Table.
            let tableDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$export$bea69a603fae01a6(pDivID, $7e68913db756e51f$export$7a850709da5c4f5b), $7e68913db756e51f$export$d6befed1f1d5e56b);
            pDiv.appendChild(tableDiv);
            let tab = (0, $f0396edd0a5c99f7$export$33bbb3ec7652e187)($7e68913db756e51f$export$bea69a603fae01a6(plDivID, $7e68913db756e51f$export$7a850709da5c4f5b), $7e68913db756e51f$export$d6befed1f1d5e56b);
            (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(tab, refs);
            t_ref_pop.forEach((ref_pop, t)=>{
                let row = [];
                row.push(t.toString());
                ref_pop.forEach((p, ref)=>{
                    row.push(p.toString());
                });
                (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(tab, row);
            });
            tableDiv.appendChild(tab);
            // Insert a save as csv button.
            $7e68913db756e51f$export$dd526fb3a2a9c049(()=>$7e68913db756e51f$var$tableToCSV(tab), pDiv, tableDiv, labelText, $7e68913db756e51f$export$d6befed1f1d5e56b);
        }
        // me:rateList.
        let xml_rl = xml_as[0].getElementsByTagName((0, $6bf90154944bce56$export$9cdf0fcb7c05190f).tagName);
        // Create a new collapsible div for the RateLists.
        let rlDivID = $7e68913db756e51f$export$bea69a603fae01a6(aDivID, (0, $6bf90154944bce56$export$9cdf0fcb7c05190f).tagName);
        let rlDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)(rlDivID, $7e68913db756e51f$export$39c84188a71202f7);
        let rlcDiv = (0, $f0396edd0a5c99f7$export$8b2cd46c11844202)(rlDivID, aDiv, null, rlDiv, (0, $6bf90154944bce56$export$9cdf0fcb7c05190f).tagName + "s", $7e68913db756e51f$export$d6befed1f1d5e56b, $7e68913db756e51f$export$39c84188a71202f7);
        if (xml_rl.length > 0) {
            // Create Table.
            let tableDiv = (0, $f0396edd0a5c99f7$export$331ff980f0d45cff)($7e68913db756e51f$export$bea69a603fae01a6(rlDivID, $7e68913db756e51f$export$7a850709da5c4f5b), $7e68913db756e51f$export$d6befed1f1d5e56b);
            rlDiv.appendChild(tableDiv);
            let tab = (0, $f0396edd0a5c99f7$export$33bbb3ec7652e187)($7e68913db756e51f$export$bea69a603fae01a6(plDivID, $7e68913db756e51f$export$7a850709da5c4f5b), $7e68913db756e51f$export$d6befed1f1d5e56b);
            // Table Header
            let th = [
                "T",
                "conc"
            ];
            for(let i = 0; i < xml_rl.length; i++){
                let rl_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_rl[i]);
                let values = [];
                values.push(rl_attributes.get("T"));
                values.push(rl_attributes.get("conc"));
                /*if (i == 0) {
                    Array.from(rl_attributes.keys()).forEach((key) => {
                        refs.push(key);
                    });
                }*/ let rl = new (0, $6bf90154944bce56$export$9cdf0fcb7c05190f)(rl_attributes);
                a.addRateList(rl);
                /*
                let labelText: string = rl.tagName + " " + i.toString() + " " + mapToString(rl_attributes);
                let rlDivID: string = addID(aDiv.id, RateList.tagName, i.toString());
                // Create a new collapsible div for the RateList.
                let rDivID: string = addID(rlDivID, i.toString());
                let rDiv: HTMLDivElement = createDiv(rlDivID, level1);
                let rcDiv: HTMLDivElement = getCollapsibleDiv(rDivID, rlDiv, null, rDiv,
                    labelText, boundary1, level0);
                */ // "me:firstOrderRate".
                let xml_for = xml_rl[i].getElementsByTagName((0, $6bf90154944bce56$export$984142e8329468e6).tagName);
                if (xml_for.length > 0) //console.log("me:firstOrderRate length " + xml_for.length);
                for(let j = 0; j < xml_for.length; j++){
                    let forate_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_for[j]);
                    if (i == 0) {
                        let fromRef = forate_attributes.get("fromRef");
                        let toRef = forate_attributes.get("toRef");
                        th.push(fromRef + "->" + toRef);
                    }
                    let s = ((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_for[j])?.nodeValue ?? "").trim();
                    values.push(s);
                    let forate = new (0, $6bf90154944bce56$export$984142e8329468e6)(forate_attributes, new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(s));
                    rl.addFirstOrderRate(forate);
                }
                // "me:firstOrderLoss".
                let xml_fol = xml_rl[i].getElementsByTagName((0, $6bf90154944bce56$export$2450ca15ad4d2ed0).tagName);
                if (xml_fol.length > 0) //console.log("me:firstOrderLoss length " + xml_fol.length);
                for(let j = 0; j < xml_fol.length; j++){
                    let fol_attributes = (0, $cc8c7201a9bad777$export$fe94072fee8a6976)(xml_fol[j]);
                    if (i == 0) Array.from(fol_attributes.values()).forEach((v)=>{
                        th.push("loss of " + v);
                    });
                    let s = ((0, $cc8c7201a9bad777$export$4e07613bf412feb7)(xml_fol[j])?.nodeValue ?? "").trim();
                    values.push(s);
                    let fol = new (0, $6bf90154944bce56$export$2450ca15ad4d2ed0)(fol_attributes, new (0, (/*@__PURE__*/$parcel$interopDefault($a227f0f1258db640$exports)))(s));
                    rl.addFirstOrderLoss(fol);
                }
                if (i == 0) (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(tab, th);
                (0, $f0396edd0a5c99f7$export$67d0e2fae00985e1)(tab, values);
            //rDiv.appendChild(createDiv(undefined, boundary1).appendChild(createLabel(th.join(","), boundary1)));
            //rDiv.appendChild(createDiv(undefined, boundary1).appendChild(createLabel(values.join(","), boundary1)));
            }
            //console.log(refs);
            tableDiv.appendChild(tab);
            // Insert a save as csv button.
            $7e68913db756e51f$export$dd526fb3a2a9c049(()=>$7e68913db756e51f$var$tableToCSV(tab), rlDiv, tableDiv, "Bartis-Widom Phenomenological Rate Coefficients", $7e68913db756e51f$export$d6befed1f1d5e56b);
        }
    }
    return aDiv;
}
/**
 * A class for creating a scatter plot.
 */ class $7e68913db756e51f$var$ScatterPlot {
    constructor(canvas, data, font){
        this.canvas = canvas;
        this.data = data;
        // Create a new scatter plot.
        this.draw(font);
    }
    /**
     * Draw the scatter plot.
     */ draw(font) {
        this.canvas.width = 800; // Set the width of the canvas
        this.canvas.height = 400; // Set the height of the canvas
        const ctx = this.canvas.getContext("2d");
        //const ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;        
        ctx.font = font;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas.
        let width = this.canvas.width;
        let height = this.canvas.height;
        let xMin = Number.MAX_VALUE;
        let xMax = Number.MIN_VALUE;
        //let yMin: number = Number.MAX_VALUE;
        //let yMax: number = Number.MIN_VALUE;
        let yMin = 0;
        let yMax = 1;
        let maxRefWidth = 0;
        this.data.forEach((ref_pop, x)=>{
            let logx = Math.log10(x.toNumber());
            xMin = Math.min(xMin, logx);
            xMax = Math.max(xMax, logx);
            ref_pop.forEach((p, ref)=>{
                maxRefWidth = Math.max(maxRefWidth, ctx.measureText(ref).width);
            });
        /*
            ref_pop.forEach((p, ref) => {
                yMin = Math.min(yMin, p.toNumber());
                yMax = Math.max(yMax, p.toNumber());
            });
            */ });
        // Calculate the width of the largest tick label
        let yTicks = 2;
        let yTickSpacing = 1;
        let maxTickLabelWidth = 0;
        for(let i = 0; i < yTicks; i++){
            let yTick = 1 - i * yTickSpacing;
            let tickLabelWidth = ctx.measureText(yTick.toString()).width;
            maxTickLabelWidth = Math.max(maxTickLabelWidth, tickLabelWidth);
        }
        // Calculate the height of the largest tick label
        let metrics = ctx.measureText("0");
        let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let xmargin = th * 4;
        // Set the margin based on the width of the largest tick label
        let ymargin = maxTickLabelWidth + th + 20; // Add 20 for some extra space
        let x0 = ymargin;
        let y0 = height - (ymargin + th * 3);
        let x1 = width - (xmargin + maxRefWidth + 20);
        let y1 = xmargin;
        let xScale = (x1 - x0) / (xMax - xMin);
        let yScale = (y1 - y0) / (yMax - yMin);
        // Draw x-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y0);
        ctx.stroke();
        // Draw y-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0, y1);
        ctx.stroke();
        // Define an array of colors for different styles
        let colors = [
            "red",
            "green",
            "blue",
            "orange",
            "purple",
            "grey",
            "cyan",
            "magenta",
            "lightblue",
            "lightgreen",
            "pink",
            "yellow",
            "brown",
            "black"
        ];
        let refToColor = new Map();
        // Draw data points.
        this.data.forEach((ref_pop, x)=>{
            // Define a reference id for each color
            let i = 0;
            ref_pop.forEach((p, ref)=>{
                let logx = Math.log10(x.toNumber());
                let xPixel = x0 + (logx - xMin) * xScale;
                let pn = p.toNumber();
                if (pn < 1) {
                    let yPixel = y0 + (pn - yMin) * yScale;
                    if (yPixel > 0) {
                        ctx.beginPath();
                        ctx.arc(xPixel, yPixel, 2, 0, 2 * Math.PI); // Points
                        // Use the ref index to select a color
                        let color = colors[i % colors.length];
                        refToColor.set(ref, color);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }
                i++;
            });
        });
        // Draw x-axis labels.
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        let xLabel = "log10(time/secs)";
        ctx.fillText(xLabel, x0 + (x1 - x0) / 2, y0 + xmargin / 2);
        // Draw y-axis labels.
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        let yLabel = "fractional population";
        ctx.fillText(yLabel, -y0 - (y1 - y0) / 2, x0 - ymargin);
        ctx.restore();
        // Draw x-axis ticks.
        let xrange = xMax - xMin;
        //console.log("xrange=" + xrange);
        let orderOfMagnitude = Math.floor(Math.log10(xrange));
        //console.log("orderOfMagnitude=" + orderOfMagnitude);
        let xTickSpacing = Math.abs(Math.ceil(xrange / Math.pow(10, orderOfMagnitude)));
        //console.log("xTickSpacing=" + xTickSpacing);
        let i = Math.ceil(xMin / xTickSpacing);
        let xTick = i * xTickSpacing;
        // Draw x-axis ticks > 0.
        while(xTick < xMax){
            //console.log("xTick=" + xTick);
            let xPixel = x0 + (xTick - xMin) * xScale; // Convert xTick to pixel scale
            ctx.beginPath();
            ctx.moveTo(xPixel, y0);
            ctx.lineTo(xPixel, y0 + 5);
            ctx.stroke();
            ctx.fillText(xTick.toString(), xPixel, y0 + 5);
            xTick += xTickSpacing;
        }
        // Draw y-axis ticks.
        for(let i = 0; i < yTicks; i++){
            let yTick = y0 - i * yTickSpacing;
            ctx.beginPath();
            ctx.moveTo(x0, yTick);
            ctx.lineTo(x0 - 5, yTick);
            ctx.stroke();
        }
        // Add a legend.
        // Calculate the maxiimum text height of a ref.
        let maxth = 0;
        refToColor.forEach((color, ref)=>{
            let metrics = ctx.measureText(ref);
            let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            maxth = Math.max(maxth, th);
        });
        // Calculate the position of the legend.
        let legendX = x1 + 20; // Position the legend 20 pixels to the right of the graph
        let legendY = y1; // Position the legend at the top of the graph
        let legendYSpacing = maxth; // Adjust as needed
        // Draw a legend for each ref.
        i = 0;
        refToColor.forEach((color, ref)=>{
            let legendYPos = legendY + i * legendYSpacing;
            ctx.fillStyle = color;
            ctx.fillRect(legendX, legendYPos, maxth / 2, maxth / 2); // Draw a small rectangle of the ref's color
            ctx.fillStyle = "black";
            ctx.fillText(ref, legendX + th + ctx.measureText(ref).width / 2, legendYPos - maxth / 2); // Draw the ref's name
            i++;
        });
    }
}
/**
 * Convert an HTMLTableElement to a CSV string.
 */ function $7e68913db756e51f$var$tableToCSV(t) {
    let csv = "";
    let rows = t.rows;
    for(let i = 0; i < rows.length; i++){
        let row = rows[i];
        let cells = row.cells;
        for(let j = 0; j < cells.length; j++){
            csv += cells[j].textContent;
            if (j < cells.length - 1) csv += ",";
        }
        csv += "\n";
    }
    return csv;
}
/**
 * For saving data to a file.
 * 
 * @param data The data.
 * @param dataType The data type.
 * @param filename The filename.
 * @param isDataURL A boolean indicating whether the data is a data URL.
 */ function $7e68913db756e51f$var$saveDataAsFile(data, dataType, filename, isDataURL = false) {
    let a = document.createElement("a");
    a.href = isDataURL ? data : `data:${dataType};charset=utf-8,` + encodeURIComponent(data);
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to the body.
    a.click(); // Programmatically click the anchor to trigger the download.
    document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
}
function $7e68913db756e51f$export$cffb3d6135ce44ec() {
    if ($7e68913db756e51f$export$3bb92be1f57fd129 == null) {
        alert("No Mesmer object to save.");
        return;
    } else {
        /**
         * Organise mesmer nodes to be in order:
         * title
         * moleculeList
         * reactionList
         * conditions
         * modelParameters
         * control
         * metadataList
         * analysis
         */ let mesmerOrdered = new (0, $69ecbdaa96f3962d$export$692079bb871c6039)($7e68913db756e51f$export$3bb92be1f57fd129.attributes);
        mesmerOrdered.setTitle($7e68913db756e51f$export$3bb92be1f57fd129.getTitle());
        if ($7e68913db756e51f$var$molecules != undefined) mesmerOrdered.setMoleculeList(new (0, $69ecbdaa96f3962d$export$19d70f3647dee606)(new Map(), Array.from($7e68913db756e51f$var$molecules.values())));
        if ($7e68913db756e51f$var$reactions != undefined) mesmerOrdered.setReactionList(new (0, $69ecbdaa96f3962d$export$44466a39ca846289)(new Map(), Array.from($7e68913db756e51f$var$reactions.values())));
        if ($7e68913db756e51f$export$3bb92be1f57fd129.getConditionss() != undefined) mesmerOrdered.setConditionss($7e68913db756e51f$export$3bb92be1f57fd129.getConditionss());
        if ($7e68913db756e51f$export$3bb92be1f57fd129.getModelParameterss() != undefined) mesmerOrdered.setModelParameterss($7e68913db756e51f$export$3bb92be1f57fd129.getModelParameterss());
        if ($7e68913db756e51f$export$3bb92be1f57fd129.getControls() != undefined) mesmerOrdered.setControls($7e68913db756e51f$export$3bb92be1f57fd129.getControls());
        let mdl = $7e68913db756e51f$export$3bb92be1f57fd129.getMetadataList();
        if (mdl != undefined) mesmerOrdered.setMetadataList(mdl);
        let analysis = $7e68913db756e51f$export$3bb92be1f57fd129.getAnalysis();
        if (analysis != undefined) mesmerOrdered.setAnalysis(analysis);
        console.log("saveXML");
        const pad = "  ";
        let xmlData = (0, $69ecbdaa96f3962d$export$692079bb871c6039).header + mesmerOrdered.toXML(pad, "");
        let title = mesmerOrdered.getTitle()?.value;
        $7e68913db756e51f$var$saveDataAsFile(xmlData, "text/xml", $7e68913db756e51f$var$getFilename(title) + ".xml");
    }
}
/**
 * Convert name into a filename.
 */ function $7e68913db756e51f$var$getFilename(name) {
    return name.replace(/[^a-z0-9]/gi, "_");
}
function $7e68913db756e51f$export$f0119d1c38383eb8(canvas, divToAddTo, elementToInsertBefore, name) {
    // Add a save button to save the canvas as an image.
    let saveButtonID = $7e68913db756e51f$export$bea69a603fae01a6(divToAddTo.id, "saveButton");
    let saveButton = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Save as PNG", saveButtonID, $7e68913db756e51f$export$d6befed1f1d5e56b);
    if (elementToInsertBefore != null) divToAddTo.insertBefore(saveButton, elementToInsertBefore);
    else divToAddTo.appendChild(saveButton);
    saveButton.addEventListener("click", ()=>{
        let dataURL = canvas.toDataURL();
        let title = $7e68913db756e51f$export$3bb92be1f57fd129.getTitle()?.value;
        $7e68913db756e51f$var$saveDataAsFile(dataURL, "image/png", $7e68913db756e51f$var$getFilename(title + "_" + name) + ".png", true);
    });
}
function $7e68913db756e51f$export$dd526fb3a2a9c049(toCSV, divToAddTo, elementToInsertBefore, name, margin) {
    let bID = $7e68913db756e51f$export$bea69a603fae01a6(divToAddTo.id, (0, $f0396edd0a5c99f7$export$25280bc3a7ce098e), $7e68913db756e51f$export$c1dfed4ad865f0b6);
    let b = (0, $f0396edd0a5c99f7$export$9b6d6ca62970729f)("Save as CSV", bID, margin);
    divToAddTo.insertBefore(b, elementToInsertBefore);
    b.addEventListener("click", ()=>{
        let csv = toCSV();
        let title = $7e68913db756e51f$export$3bb92be1f57fd129.getTitle()?.value;
        let fn = $7e68913db756e51f$var$getFilename(title + "_" + name) + ".csv";
        $7e68913db756e51f$var$saveDataAsFile(csv, "text/csv", fn);
        console.log("Saved " + fn);
    });
}


export {$7e68913db756e51f$export$b1ddbf2a116c10ee as level0, $7e68913db756e51f$export$39c84188a71202f7 as level1, $7e68913db756e51f$export$d6befed1f1d5e56b as boundary1, $7e68913db756e51f$export$9932f6cd2d05a4cf as sy_add, $7e68913db756e51f$export$96d8a15ea1620cf4 as sy_edit, $7e68913db756e51f$export$b758aa9bd161846e as sy_deselected, $7e68913db756e51f$export$f0fb6e9d3fd6cf72 as sy_selected, $7e68913db756e51f$export$1bb8965d05fbf467 as s_Add_sy_add, $7e68913db756e51f$export$b071b08ccb05fd2 as s_Add_from_library, $7e68913db756e51f$export$3e0cc820631ca658 as s_Add_from_spreadsheet, $7e68913db756e51f$export$7295f538b9762c5 as s_container, $7e68913db756e51f$export$666359451816b0e7 as s_description, $7e68913db756e51f$export$d4bce1ca150a4b6a as s_molecules, $7e68913db756e51f$export$58785e0018b77d4a as s_input, $7e68913db756e51f$export$50cc31b59b02e033 as s_optionOn, $7e68913db756e51f$export$d52efe23389358db as s_optionOff, $7e68913db756e51f$export$ce30911bcd78542 as s_reactions, $7e68913db756e51f$export$bb916e6caf34db48 as s_Remove_sy_remove, $7e68913db756e51f$export$c1dfed4ad865f0b6 as s_save, $7e68913db756e51f$export$d8b8827abc8ab7e7 as s_selectOption, $7e68913db756e51f$export$7a850709da5c4f5b as s_table, $7e68913db756e51f$export$2f2abd8810196a7 as s_undefined, $7e68913db756e51f$export$5a13f59b7b9618a3 as s_units, $7e68913db756e51f$export$39722580448f5a99 as addID, $7e68913db756e51f$export$bea69a603fae01a6 as addRID, $7e68913db756e51f$export$cd7f480d6b8286c3 as remove, $7e68913db756e51f$export$32f4a893b4a151db as menuDivID, $7e68913db756e51f$export$a94c859b6fc3ec52 as big0, $7e68913db756e51f$export$e0d5b774927d0e2a as IDManager, $7e68913db756e51f$export$3bb92be1f57fd129 as mesmer, $7e68913db756e51f$export$ebe90cb607ad99e as defaults, $7e68913db756e51f$export$7c97c73a2c729cf9 as libmols, $7e68913db756e51f$export$ac55d333e780178c as addMolecule, $7e68913db756e51f$export$5ac38056c0103baa as getMoleculeKeys, $7e68913db756e51f$export$7577c09cb43cc206 as getMolecule, $7e68913db756e51f$export$196db41cc586e1c as s_Reactions_Diagram, $7e68913db756e51f$export$11e63f7b0f3d9900 as load, $7e68913db756e51f$export$8f4af86541f72bfe as removeOptionByClassName, $7e68913db756e51f$export$a30e0f90a7434924 as addOptionByClassName, $7e68913db756e51f$export$56da8d49d79e2ff7 as addProperty, $7e68913db756e51f$export$f729a71031e2cfe2 as addPropertyScalarNumber, $7e68913db756e51f$export$17d48ee8ddbf2d44 as processNumber, $7e68913db756e51f$export$2b2254f82abcc900 as addAnyUnits, $7e68913db756e51f$export$10de1fc8385eec4a as addOrRemoveInstructions, $7e68913db756e51f$export$819b5ff7dff3652c as setNumberArrayNode, $7e68913db756e51f$export$590bdcb7f5f5327a as addRemoveButton, $7e68913db756e51f$export$2aabceac90b71d10 as processPropertyScalarNumber, $7e68913db756e51f$export$9d37ed1c0ac75637 as processPropertyScalarString, $7e68913db756e51f$export$b1e4cbf5b56e0e21 as setNumberNode, $7e68913db756e51f$export$3b08dcba56872ec6 as selectAnotherOptionEventListener, $7e68913db756e51f$export$f0119d1c38383eb8 as addSaveAsPNGButton, $7e68913db756e51f$export$dd526fb3a2a9c049 as addSaveAsCSVButton, $7e68913db756e51f$export$cffb3d6135ce44ec as saveXML};
//# sourceMappingURL=index.d6101bc6.js.map
