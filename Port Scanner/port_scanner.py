import socket, re
from common_ports import ports_and_services

def get_open_ports(target, port_range, verbose = False):

	open_ports = []
	try:
		host = socket.gethostbyname_ex(target)
		start = port_range[0]
		end = port_range[1]
	except OSError:
		if re.match('(?:\d{1,3}\.{1}\d{1,3}\.{1}\d{1,3}\.{1}\d{1,3})', target):
			return 'Error: Invalid IP address'
		else: 
			return 'Error: Invalid hostname'
	for port in range(start, end+1):
		s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		s.settimeout(1)

		result = s.connect_ex((host[0], port))
		if result == 0:
			open_ports.append(port)
		s.close()
	
	if verbose:
		verbose_ports = []
		try:
			site = socket.gethostbyaddr(target)
			verbose_ports.append('Open ports for {} ({})'.format(site[0], ''.join(site[2])))
		except: 
			verbose_ports.append('Open ports for {}'.format(host[0]))
		verbose_ports.append('PORT'.ljust(9) + 'SERVICE')
		for port in open_ports:
			service = ports_and_services[port]
			verbose_ports.append(str(port).ljust(9) + service)
		print('\n'.join(verbose_ports))
		return('\n'.join(verbose_ports))
	else: 
		print(open_ports)
		return open_ports