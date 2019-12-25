<?php


namespace App\Http\Controllers;


class ApiController extends Controller
{
    protected $type = null;

    public function sendResponse($result)
    {
        if (key_exists('id', $result)) {
            $attrs = [];
            foreach ($result as $key => $val) {
                if ($key != 'id') {
                    $attrs[$key] = $val;
                }
            }
            $formatted = [
                    'type' => $this->type,
                    'id' => $result['id'],
                    'attributes' => $attrs
            ];
        } else {
            $formatted = array_map(function ($r) {
                $attrs = [];
                foreach ($r as $key => $val) {
                    if ($key != 'id') {
                        $attrs[$key] = $val;
                    }
                }
                return [
                    'type' => $this->type,
                    'id' => $r['id'],
                    'attributes' => $attrs
                ];
            },
                $result
            );
        }
        return response()->json(['data' => $formatted], 200);
    }

    public function sendError($error,$errorMessages=[], $code = 404)
    {
        array_unshift($errorMessages, $error);
        $response = [
            'errors' => $errorMessages,
        ];

        return response()->json($response, $code);
    }
}