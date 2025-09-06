import argparse
import pythonosc.dispatcher
import pythonosc.osc_server



def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", default="0.0.0.0", help="The IP address to listen on")
    parser.add_argument("--port", type=int, default=1130)

    args = parser.parse_args()

    dispatcher = pythonosc.dispatcher.Dispatcher()
    dispatcher.set_default_handler(print)


    server = pythonosc.osc_server.ThreadingOSCUDPServer((args.ip, args.port), dispatcher)
    print(f"Serving on {server.server_address}")
    server.serve_forever()


if __name__ == "__main__":
    main()
