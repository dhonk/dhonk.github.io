from livereload import Server
server = Server()
server.watch('*.html', '*.js')
server.serve(root='.')
