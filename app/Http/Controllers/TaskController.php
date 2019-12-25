<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\Validator;
use App\Task;
use Illuminate\Http\Request;

use App\Http\Requests;

class TaskController extends ApiController
{
    protected $type = 'task';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tasks = Task::all();
        return $this->sendResponse($tasks->toArray());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $input = $request->all()['data']['attributes'];


//        $validator = Validator::make($input, [
//            'name' => 'required',
//            'isFinished' => 'required'
//        ]);


//        if($validator->fails()){
//            return $this->sendError('Validation Error.', $validator->errors());
//        }


        $task = Task::create($input);


        return $this->sendResponse($task->toArray());
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $post = Task::find($id);


        if (is_null($post)) {
            return $this->sendError('Post not found.');
        }


        return $this->sendResponse($post->toArray());
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $input = $request->all()['data']['attributes'];

//        $validator = Validator::make($input, [
//            'name' => 'required',
//            'isFinished' => 'required'
//        ]);


//        if($validator->fails()){
//            return $this->sendError('Validation Error.', $validator->errors());
//        }


        $task = Task::find($id);
        if (is_null($task)) {
            return $this->sendError('Task not found.');
        }


        $task->name = $input['name'];
        $task->finished = $input['finished'];
        $task->save();


        return $this->sendResponse($task->toArray());
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);


        if (is_null($task)) {
            return response('{"meta":{}}', 404);
        }


        $task->delete();


        return response('{"meta":{}}', 200) ;
    }
}
