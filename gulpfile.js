var gulp = require('gulp')
var connect = require('gulp-connect')
var Mock = require('mockjs')
var MODEL = {
    '/api/user/query': {
        'list|10': [{
            name: '@name'
        }]
    }
}

// https://github.com/AveVlad/gulp-connect
gulp.task('server', function() {
    connect.server({
        port: 4321,
        middleware: function( /*connect, opt*/ ) {
            return [
                // https://github.com/senchalabs/connect/#use-middleware
                function mock(req, res, next) {
                    // 在这里检测根据 req 的路径和类型，执行相应的 Mock.mock
                    if (MODEL[req.url]) {
                        res.end(
                            JSON.stringify(
                                Mock.mock(
                                    MODEL[req.url]
                                )
                            )
                        )
                    }
                    next()
                }
            ]
        }
    })
})

gulp.task('default', ['server'])