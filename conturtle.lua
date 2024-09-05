-- vvv CHANGE THIS vvv --
local URL = "WEBSOCKETURL"
local PORT = "PORT"
-- ^^^^^^^^^^^^^^^^^^^ --

local wsAddr = "ws://" .. URL .. ":" .. PORT

print(wsAddr)

if wsAddr == "ws://WEBSOCKETURL:PORT" then
    print("PLEASE SET THE URL BEFORE RUNNING")
    return
end

-- Open a WebSocket connection

local ws, connectError = http.websocket(wsAddr)
if not ws then
    print("Error connecting to WebSocket: " .. connectError)
    return
end

local function fromJSON(json)
    return textutils.unserialiseJSON(json)
end

local function toJSON(table)
    return textutils.serialiseJSON(table)
end

local function main()
    print("Connected to WebSocket server.")

    ws.send("renameSelf|" .. os.getComputerLabel())

    while true do
        local msg, err = ws.receive()
        msg = fromJSON(msg)
        if msg then
            print(msg)
            if msg["code"] then
                print("Received code: " .. msg["code"])
                local func, loadErr = load(msg["code"])
                if func then
                    local success, runErr = pcall(func)
                    if not success then
                        print("Error running code: " .. tostring(runErr))
                    end
                else
                    print("Error loading code: " .. tostring(loadErr))
                end
            else
                print("No script found in the message")
            end
        else
            print("Error receiving message: " .. tostring(err))
        end
    end
end

local ok, errorMessage = pcall(main)

pcall(ws and ws.close or function()end)

if not ok then
  printError(errorMessage) -- print the error like it normally would
end
