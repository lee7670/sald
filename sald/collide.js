
/* Circle vs Circle
 * INPUT: two circles specified by position and radius:
 *  c1 = {x:, y:, r:}, c2 = {x:, y:, r:}
 * RETURN VALUE:
 *  false if c1 and c2 do not intersect
 *  true if c1 and c2 do intersect
 */
function circleCircle(c1,c2) {
	var a = (c1.x-c2.x)*(c1.x-c2.x)+(c1.y-c2.y)*(c1.y-c2.y);
    var b = c1.r+c2.r;
    b = b*b;
	return a<b;
}

/* Rectangle vs Rectangle
 * INPUT: rectangles specified by their minimum and maximum extents:
 *  r = {min:{x:, y:}, max:{x:, y:}}
 * RETURN VALUE:
 *  false if r1 and r2 do not intersect
 *  true if r1 and r2 do intersect
 */
function rectangleRectangle(r1, r2) {
	var xint = ((r1.min.x>r2.min.x) && (r1.min.x<r2.max.x))||((r1.max.x<r2.max.x)&&(r1.max.x>r2.min.x));
    var yint = ((r1.min.y>r2.min.y) && (r1.min.y<r2.max.y))||((r1.max.y<r2.max.y)&&(r1.max.y>r2.min.y));
	return xint&&yint;
}

function getNormals(p) {
    var A; 
    for(var i =0; i<p.length;i++)
    {
        var point1 = p[i];
        var point2;
        if(i+1===p.length){
            point2=p[0];
        }
        else{
            point2=p[i+1];
        };
        var edge={x:point1.x-point2.x, y:point1.y-point2.y}
        var norm={x:edge.y, y:-edge.x};
        A[i]=norm;
    }
    return A;
}
function project(a, p){
    var max=p[0].x*a.x+p[0].y*a.y;
    var min=max;
    for(var i=0; i<p.length; i++)
    {
        var z = a.x*p[i].x+a.y*p[i].y;
        if(p < min) {
            min = z;
        }
        else if(p>max) {
            max = z;
        }
    }
    return {min:min, max:max};
}
/* Convex vs Convex
 * INPUT: convex polygons as lists of vertices in CCW order
 *  p = [{x:,y:}, ..., {x:, y:}]
 * RETURN VALUE:
 *  false if p1 and p2 do not intersect
 *  true if p1 and p2 do intersect
 */
function convexConvex(p1, p2) {
    //using the SAT
	var A1=getNormals(p1);
    var A2=getNormals(p2);
    for(var i=0; i<A1.lenght; i++)
    {
        var axis=A1[i];
        var proj1=project(axis, p1);
        var proj2=project(axis, p2);
        //if projections don't overlap, return false
        if((proj1.min<proj2.min&&proj1.max<proj2.min)||(proj2.min<proj1.min&&proj2.max<proj1.min)){
            return false;
        }
    }
    for(var j=0; j<a2.length; j++)
    {
        var axis=A2[j];
        var proj1=project(axis, p1);
        var proj2=project(axis, p2);
        //if projections don't overlap, return false
        if((proj1.min<proj2.min&&proj1.max<proj2.min)||(proj2.min<proj1.min&&proj2.max<proj1.min)){
            return false;
        }
    }
	return true;
}

/* Rav vs Circle
 * INPUT: ray specified as a start and end point, circle as above.
 *  ray = {start:{x:, y:}, end:{x:, y:}}
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayCircle(r, c) {
	var a=(r.end.x-r.start.x)*(r.end.x-r.start.x)+(r.end.y-r.start.y)*(r.end.y-r.start.y);
    var b=2*(r.end.x-r.start.x)(r.start.x-c.x)+2*(r.end.y-r.start.y)*(r.start.y-c.y);
    var c=(r.start.x-c.x)*(r.start.x-c.x)+(r.start.y-c.y)*(r.start.y-c.y)-c.r*c.r;
    var d=b*b-4*a*c;
    if(d<0) return null;
    t=2*c/(-b+Math.sqrt(d));
    if(t>=0&&t<=1){
        return t;
    }
	return null;
}

/* Rav vs Rectangle
 * INPUT: ray as above, rectangle as above.
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayRectangle(r, b) {
	var dir={x:r.end.x-r.start.x, y:r.end.y-r.start.y};
    var t0x=
	return null;
}

/* Rav vs Convex
 * INPUT: ray as above, convex polygon as above.
 * RETURN VALUE:
 *  null if no intersection
 *  {t:} if intersection
 *    -- NOTE: 0.0 <= t <= 1.0 gives the position of the first intersection
 */
function rayConvex(r, p) {
	//TODO
	return null;
}


module.exports = {
	circleCircle: circleCircle,
	rectangleRectangle: rectangleRectangle,
	convexConvex: convexConvex,
	rayCircle: rayCircle,
	rayRectangle: rayRectangle,
	rayConvex: rayConvex
};
