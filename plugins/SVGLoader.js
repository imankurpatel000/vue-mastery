import { DefaultLoadingManager, FileLoader, Matrix3, Path, ShapePath, Vector2, Vector3 } from 'Three'
/**
 * @author mrdoob / http://mrdoob.com/
 * @author zz85 / http://joshuakoo.com/
 * @author yomboprime / https://yombo.org
 */

class SVGLoader {
  constructor (manager) {
    this.manager = manager !== undefined ? manager : DefaultLoadingManager
    console.log('ici', this.manager)
  }

  load (url, onLoad, onProgress, onError) {
    let scope = this

    let loader = new FileLoader(scope.manager)
    loader.setPath(scope.path)
    loader.load(
      url,
      (text) => {
        onLoad(scope.parse(text))
      },
      onProgress,
      onError
    )
  }

  setPath (value) {
    this.path = value
    return this
  }

  parse (text) {
    const parseNode = (node, style) => {
      if (node.nodeType !== 1) return

      let transform = getNodeTransform(node)

      let path = null

      switch (node.nodeName) {
        case 'svg':
          break

        case 'g':
          style = parseStyle(node, style)
          break

        case 'path':
          style = parseStyle(node, style)
          if (node.hasAttribute('d') && isVisible(style)) path = parsePathNode(node, style)
          break

        case 'rect':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parseRectNode(node, style)
          break

        case 'polygon':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parsePolygonNode(node, style)
          break

        case 'polyline':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parsePolylineNode(node, style)
          break

        case 'circle':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parseCircleNode(node, style)
          break

        case 'ellipse':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parseEllipseNode(node, style)
          break

        case 'line':
          style = parseStyle(node, style)
          if (isVisible(style)) path = parseLineNode(node, style)
          break
      }

      if (path) {
        transformPath(path, currentTransform)

        paths.push(path)
      }

      let nodes = node.childNodes

      for (let i = 0; i < nodes.length; i++) {
        parseNode(nodes[i], style)
      }

      if (transform) {
        currentTransform.copy(transformStack.pop())
      }
    }

    const parsePathNode = (node, style) => {
      let path = new ShapePath()
      path.color.setStyle(style.fill)

      let point = new Vector2()
      let control = new Vector2()

      let firstPoint = new Vector2()
      let isFirstPoint = true
      let doSetFirstPoint = false

      let d = node.getAttribute('d')

      let commands = d.match(/[a-df-z][^a-df-z]*/gi)

      for (let i = 0, l = commands.length; i < l; i++) {
        let command = commands[i]

        let type = command.charAt(0)
        let data = command.substr(1).trim()

        if (isFirstPoint === true) {
          doSetFirstPoint = true
          isFirstPoint = false
        }

        const numbers = parseFloats(data)

        switch (type) {
          case 'M':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x = numbers[j + 0]
              point.y = numbers[j + 1]
              control.x = point.x
              control.y = point.y
              if (j === 0) {
                path.moveTo(point.x, point.y)
              } else {
                path.lineTo(point.x, point.y)
              }
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'H':
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.x = numbers[j]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'V':
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.y = numbers[j]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'L':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x = numbers[j + 0]
              point.y = numbers[j + 1]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'C':
            for (let j = 0, jl = numbers.length; j < jl; j += 6) {
              path.bezierCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], numbers[j + 5])
              control.x = numbers[j + 2]
              control.y = numbers[j + 3]
              point.x = numbers[j + 4]
              point.y = numbers[j + 5]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'S':
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.bezierCurveTo(
                getReflection(point.x, control.x),
                getReflection(point.y, control.y),
                numbers[j + 0],
                numbers[j + 1],
                numbers[j + 2],
                numbers[j + 3]
              )
              control.x = numbers[j + 0]
              control.y = numbers[j + 1]
              point.x = numbers[j + 2]
              point.y = numbers[j + 3]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'Q':
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.quadraticCurveTo(numbers[j + 0], numbers[j + 1], numbers[j + 2], numbers[j + 3])
              control.x = numbers[j + 0]
              control.y = numbers[j + 1]
              point.x = numbers[j + 2]
              point.y = numbers[j + 3]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'T':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              let rx = getReflection(point.x, control.x)
              let ry = getReflection(point.y, control.y)
              path.quadraticCurveTo(rx, ry, numbers[j + 0], numbers[j + 1])
              control.x = rx
              control.y = ry
              point.x = numbers[j + 0]
              point.y = numbers[j + 1]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'A':
            for (let j = 0, jl = numbers.length; j < jl; j += 7) {
              let start = point.clone()
              point.x = numbers[j + 5]
              point.y = numbers[j + 6]
              control.x = point.x
              control.y = point.y
              parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          //

          case 'm':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x += numbers[j + 0]
              point.y += numbers[j + 1]
              control.x = point.x
              control.y = point.y
              if (j === 0) {
                path.moveTo(point.x, point.y)
              } else {
                path.lineTo(point.x, point.y)
              }
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'h':
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.x += numbers[j]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'v':
            for (let j = 0, jl = numbers.length; j < jl; j++) {
              point.y += numbers[j]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'l':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              point.x += numbers[j + 0]
              point.y += numbers[j + 1]
              control.x = point.x
              control.y = point.y
              path.lineTo(point.x, point.y)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'c':
            for (let j = 0, jl = numbers.length; j < jl; j += 6) {
              path.bezierCurveTo(
                point.x + numbers[j + 0],
                point.y + numbers[j + 1],
                point.x + numbers[j + 2],
                point.y + numbers[j + 3],
                point.x + numbers[j + 4],
                point.y + numbers[j + 5]
              )
              control.x = point.x + numbers[j + 2]
              control.y = point.y + numbers[j + 3]
              point.x += numbers[j + 4]
              point.y += numbers[j + 5]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 's':
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.bezierCurveTo(
                getReflection(point.x, control.x),
                getReflection(point.y, control.y),
                point.x + numbers[j + 0],
                point.y + numbers[j + 1],
                point.x + numbers[j + 2],
                point.y + numbers[j + 3]
              )
              control.x = point.x + numbers[j + 0]
              control.y = point.y + numbers[j + 1]
              point.x += numbers[j + 2]
              point.y += numbers[j + 3]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'q':
            for (let j = 0, jl = numbers.length; j < jl; j += 4) {
              path.quadraticCurveTo(point.x + numbers[j + 0], point.y + numbers[j + 1], point.x + numbers[j + 2], point.y + numbers[j + 3])
              control.x = point.x + numbers[j + 0]
              control.y = point.y + numbers[j + 1]
              point.x += numbers[j + 2]
              point.y += numbers[j + 3]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 't':
            for (let j = 0, jl = numbers.length; j < jl; j += 2) {
              let rx = getReflection(point.x, control.x)
              let ry = getReflection(point.y, control.y)
              path.quadraticCurveTo(rx, ry, point.x + numbers[j + 0], point.y + numbers[j + 1])
              control.x = rx
              control.y = ry
              point.x = point.x + numbers[j + 0]
              point.y = point.y + numbers[j + 1]
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          case 'a':
            for (let j = 0, jl = numbers.length; j < jl; j += 7) {
              let start = point.clone()
              point.x += numbers[j + 5]
              point.y += numbers[j + 6]
              control.x = point.x
              control.y = point.y
              parseArcCommand(path, numbers[j], numbers[j + 1], numbers[j + 2], numbers[j + 3], numbers[j + 4], start, point)
              if (j === 0 && doSetFirstPoint === true) firstPoint.copy(point)
            }
            break

          //

          case 'Z':
          case 'z':
            path.currentPath.autoClose = true
            if (path.currentPath.curves.length > 0) {
              // Reset point to beginning of Path
              point.copy(firstPoint)
              path.currentPath.currentPoint.copy(point)
              isFirstPoint = true
            }
            break
        }

        // console.log( type, parseFloats( data ), parseFloats( data ).length  )

        doSetFirstPoint = false
      }

      return path
    }

    /**
     * https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
     * https://mortoray.com/2017/02/16/rendering-an-svg-elliptical-arc-as-bezier-curves/ Appendix: Endpoint to center arc conversion
     * From
     * rx ry x-axis-rotation large-arc-flag sweep-flag x y
     * To
     * aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation
     */

    const parseArcCommand = (path, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, start, end) => {
      xAxisRotation = (xAxisRotation * Math.PI) / 180

      // Ensure radii are positive
      rx = Math.abs(rx)
      ry = Math.abs(ry)

      // Compute (x1â², y1â²)
      let dx2 = (start.x - end.x) / 2.0
      let dy2 = (start.y - end.y) / 2.0
      let x1p = Math.cos(xAxisRotation) * dx2 + Math.sin(xAxisRotation) * dy2
      let y1p = -Math.sin(xAxisRotation) * dx2 + Math.cos(xAxisRotation) * dy2

      // Compute (cxâ², cyâ²)
      let rxs = rx * rx
      let rys = ry * ry
      let x1ps = x1p * x1p
      let y1ps = y1p * y1p

      // Ensure radii are large enough
      let cr = x1ps / rxs + y1ps / rys

      if (cr > 1) {
        // scale up rx,ry equally so cr == 1
        let s = Math.sqrt(cr)
        rx = s * rx
        ry = s * ry
        rxs = rx * rx
        rys = ry * ry
      }

      let dq = rxs * y1ps + rys * x1ps
      let pq = (rxs * rys - dq) / dq
      let q = Math.sqrt(Math.max(0, pq))
      if (largeArcFlag === sweepFlag) q = -q
      let cxp = (q * rx * y1p) / ry
      let cyp = (-q * ry * x1p) / rx

      // Step 3: Compute (cx, cy) from (cxâ², cyâ²)
      let cx = Math.cos(xAxisRotation) * cxp - Math.sin(xAxisRotation) * cyp + (start.x + end.x) / 2
      let cy = Math.sin(xAxisRotation) * cxp + Math.cos(xAxisRotation) * cyp + (start.y + end.y) / 2

      // Step 4: Compute Î¸1 and ÎÎ¸
      let theta = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
      let delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % (Math.PI * 2)

      path.currentPath.absellipse(cx, cy, rx, ry, theta, theta + delta, sweepFlag === 0, xAxisRotation)
    }

    const svgAngle = (ux, uy, vx, vy) => {
      let dot = ux * vx + uy * vy
      let len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy)
      let ang = Math.acos(Math.max(-1, Math.min(1, dot / len))) // floating point precision, slightly over values appear
      if (ux * vy - uy * vx < 0) ang = -ang
      return ang
    }

    /*
     * According to https://www.w3.org/TR/SVG/shapes.html#RectElementRXAttribute
     * rounded corner should be rendered to elliptical arc, but bezier curve does the job well enough
     */
    const parseRectNode = (node, style) => {
      let x = parseFloat(node.getAttribute('x') || 0)
      let y = parseFloat(node.getAttribute('y') || 0)
      let rx = parseFloat(node.getAttribute('rx') || 0)
      let ry = parseFloat(node.getAttribute('ry') || 0)
      let w = parseFloat(node.getAttribute('width'))
      let h = parseFloat(node.getAttribute('height'))

      let path = new ShapePath()
      path.color.setStyle(style.fill)
      path.moveTo(x + 2 * rx, y)
      path.lineTo(x + w - 2 * rx, y)
      if (rx !== 0 || ry !== 0) path.bezierCurveTo(x + w, y, x + w, y, x + w, y + 2 * ry)
      path.lineTo(x + w, y + h - 2 * ry)
      if (rx !== 0 || ry !== 0) path.bezierCurveTo(x + w, y + h, x + w, y + h, x + w - 2 * rx, y + h)
      path.lineTo(x + 2 * rx, y + h)

      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(x, y + h, x, y + h, x, y + h - 2 * ry)
      }

      path.lineTo(x, y + 2 * ry)

      if (rx !== 0 || ry !== 0) {
        path.bezierCurveTo(x, y, x, y, x + 2 * rx, y)
      }

      return path
    }

    const parsePolygonNode = (node, style) => {
      const iterator = (match, a, b) => {
        let x = parseFloat(a)
        let y = parseFloat(b)

        if (index === 0) {
          path.moveTo(x, y)
        } else {
          path.lineTo(x, y)
        }

        index++
      }

      let regex = /(-?[\d.?]+)[,|\s](-?[\d.?]+)/g

      let path = new ShapePath()
      path.color.setStyle(style.fill)

      let index = 0

      node.getAttribute('points').replace(regex, iterator)

      path.currentPath.autoClose = true

      return path
    }

    const parsePolylineNode = (node, style) => {
      const iterator = (match, a, b) => {
        let x = parseFloat(a)
        let y = parseFloat(b)

        if (index === 0) {
          path.moveTo(x, y)
        } else {
          path.lineTo(x, y)
        }

        index++
      }

      let regex = /(-?[\d.?]+)[,|\s](-?[\d.?]+)/g

      let path = new ShapePath()
      path.color.setStyle(style.fill)

      let index = 0

      node.getAttribute('points').replace(regex, iterator)

      path.currentPath.autoClose = false

      return path
    }

    const parseCircleNode = (node, style) => {
      let x = parseFloat(node.getAttribute('cx'))
      let y = parseFloat(node.getAttribute('cy'))
      let r = parseFloat(node.getAttribute('r'))

      let subpath = new Path()
      subpath.absarc(x, y, r, 0, Math.PI * 2)

      let path = new ShapePath()
      path.color.setStyle(style.fill)
      path.subPaths.push(subpath)

      return path
    }

    const parseEllipseNode = (node, style) => {
      let x = parseFloat(node.getAttribute('cx'))
      let y = parseFloat(node.getAttribute('cy'))
      let rx = parseFloat(node.getAttribute('rx'))
      let ry = parseFloat(node.getAttribute('ry'))

      let subpath = new Path()
      subpath.absellipse(x, y, rx, ry, 0, Math.PI * 2)

      let path = new ShapePath()
      path.color.setStyle(style.fill)
      path.subPaths.push(subpath)

      return path
    }

    const parseLineNode = (node, style) => {
      let x1 = parseFloat(node.getAttribute('x1'))
      let y1 = parseFloat(node.getAttribute('y1'))
      let x2 = parseFloat(node.getAttribute('x2'))
      let y2 = parseFloat(node.getAttribute('y2'))

      let path = new ShapePath()
      path.moveTo(x1, y1)
      path.lineTo(x2, y2)
      path.currentPath.autoClose = false

      return path
    }

    const parseStyle = (node, style) => {
      style = Object.assign({}, style) // clone style

      if (node.hasAttribute('fill')) style.fill = node.getAttribute('fill')
      if (node.style.fill !== '') style.fill = node.style.fill

      return style
    }

    const isVisible = (style) => {
      return style.fill !== 'none' && style.fill !== 'transparent'
    }

    // http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes

    const getReflection = (a, b) => {
      return a - (b - a)
    }

    const parseFloats = (string) => {
      let array = string.split(/[\s,]+|(?=\s?[+-])/)

      for (let i = 0; i < array.length; i++) {
        let number = array[i]

        // Handle values like 48.6037.7.8
        // TODO Find a regex for this

        if (number.indexOf('.') !== number.lastIndexOf('.')) {
          let split = number.split('.')

          for (let s = 2; s < split.length; s++) {
            array.splice(i + s - 1, 0, '0.' + split[s])
          }
        }

        array[i] = parseFloat(number)
      }

      return array
    }

    const getNodeTransform = (node) => {
      if (!node.hasAttribute('transform')) {
        return null
      }

      let transform = parseTransformNode(node)

      if (transform) {
        if (transformStack.length > 0) {
          transform.premultiply(transformStack[transformStack.length - 1])
        }

        currentTransform.copy(transform)
        transformStack.push(transform)
      }

      return transform
    }

    const parseTransformNode = (node) => {
      let transform = new Matrix3()
      let currentTransform = tempTransform0
      let transformsTexts = node.getAttribute('transform').split(' ')

      for (let tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex--) {
        let transformText = transformsTexts[tIndex]
        let openParPos = transformText.indexOf('(')
        let closeParPos = transformText.indexOf(')')

        if (openParPos > 0 && openParPos < closeParPos) {
          let transformType = transformText.substr(0, openParPos)

          let array = parseFloats(transformText.substr(openParPos + 1, closeParPos - openParPos - 1))

          currentTransform.identity()

          switch (transformType) {
            case 'translate':
              if (array.length >= 1) {
                let tx = array[0]
                let ty = tx

                if (array.length >= 2) {
                  ty = array[1]
                }

                currentTransform.translate(tx, ty)
              }

              break

            case 'rotate':
              if (array.length >= 1) {
                let angle = 0
                let cx = 0
                let cy = 0

                // Angle
                angle = (-array[0] * Math.PI) / 180

                if (array.length >= 3) {
                  // Center x, y
                  cx = array[1]
                  cy = array[2]
                }

                // Rotate around center (cx, cy)
                tempTransform1.identity().translate(-cx, -cy)
                tempTransform2.identity().rotate(angle)
                tempTransform3.multiplyMatrices(tempTransform2, tempTransform1)
                tempTransform1.identity().translate(cx, cy)
                currentTransform.multiplyMatrices(tempTransform1, tempTransform3)
              }

              break

            case 'scale':
              if (array.length >= 1) {
                let scaleX = array[0]
                let scaleY = scaleX

                if (array.length >= 2) {
                  scaleY = array[1]
                }

                currentTransform.scale(scaleX, scaleY)
              }

              break

            case 'skewX':
              if (array.length === 1) {
                currentTransform.set(1, Math.tan((array[0] * Math.PI) / 180), 0, 0, 1, 0, 0, 0, 1)
              }

              break

            case 'skewY':
              if (array.length === 1) {
                currentTransform.set(1, 0, 0, Math.tan((array[0] * Math.PI) / 180), 1, 0, 0, 0, 1)
              }

              break

            case 'matrix':
              if (array.length === 6) {
                currentTransform.set(array[0], array[2], array[4], array[1], array[3], array[5], 0, 0, 1)
              }

              break
          }
        }

        transform.premultiply(currentTransform)
      }

      return transform
    }

    const transformPath = (path, m) => {
      const transfVec2 = (v2) => {
        tempV3.set(v2.x, v2.y, 1).applyMatrix3(m)

        v2.set(tempV3.x, tempV3.y)
      }

      isTransformRotated(m)

      let tempV2 = new Vector2()
      let tempV3 = new Vector3()

      let subPaths = path.subPaths

      for (let i = 0, n = subPaths.length; i < n; i++) {
        let subPath = subPaths[i]
        let curves = subPath.curves

        for (let j = 0; j < curves.length; j++) {
          let curve = curves[j]

          if (curve.isLineCurve) {
            transfVec2(curve.v1)
            transfVec2(curve.v2)
          } else if (curve.isCubicBezierCurve) {
            transfVec2(curve.v0)
            transfVec2(curve.v1)
            transfVec2(curve.v2)
            transfVec2(curve.v3)
          } else if (curve.isQuadraticBezierCurve) {
            transfVec2(curve.v0)
            transfVec2(curve.v1)
            transfVec2(curve.v2)
          } else if (curve.isEllipseCurve) {
            tempV2.set(curve.aX, curve.aY)
            transfVec2(tempV2)
            curve.aX = tempV2.x
            curve.aY = tempV2.y

            curve.xRadius *= getTransformScaleX(m)
            curve.yRadius *= getTransformScaleY(m)
          }
        }
      }
    }

    const isTransformRotated = (m) => {
      return m.elements[1] !== 0 || m.elements[3] !== 0
    }

    const getTransformScaleX = (m) => {
      let te = m.elements
      return Math.sqrt(te[0] * te[0] + te[1] * te[1])
    }

    const getTransformScaleY = (m) => {
      let te = m.elements
      return Math.sqrt(te[3] * te[3] + te[4] * te[4])
    }

    let paths = []

    let transformStack = []

    let tempTransform0 = new Matrix3()
    let tempTransform1 = new Matrix3()
    let tempTransform2 = new Matrix3()
    let tempTransform3 = new Matrix3()

    let currentTransform = new Matrix3()

    let xml = new DOMParser().parseFromString(text, 'image/svg+xml') // application/xml

    parseNode(xml.documentElement, { fill: '#000' })

    // console.log( paths );

    return paths
  }
}

export { SVGLoader }
