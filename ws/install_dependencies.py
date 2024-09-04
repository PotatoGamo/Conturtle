import subprocess

def main():
    try:
        # Use subprocess for better control and security
        subprocess.run("npm install ws", shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")

if __name__ == "__main__":
    main()
    
