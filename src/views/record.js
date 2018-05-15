import { Button, List} from 'antd-mobile';
import React, {Component} from 'react';

const Item = List.Item;

export default class Record extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: {
                recordTime: null,
                beginTime: null,
                endTime: null,
            },
            records: []
        }

        this.record = {};
        this.beginRecord = this.beginRecord.bind(this);
        this.overRecord = this.overRecord.bind(this);
    }

    render() {
        // 历史记录
        const historyItems = this.state.records.map((item, index) =>
            <Item extra={"记录" + (index+1) } arrow="empty" className="record-item" wrap> {this.transToDate(item.recordTime)}</Item>
        );
        return (
            <div className="record-content">
                {!this.timer && <Button type="primary" onClick={this.beginRecord} >开始计时</Button> }
                <List renderHeader={() => '记录列表'} className="record-list">
                    {historyItems}
                    <Item extra={"记录中"} arrow="empty" className="record-item" wrap> {this.transToDate(this.state.record.recordTime)}</Item>
                </List>
                {this.timer && <Button type="primary" onClick={this.overRecord} >停止计时</Button> }
            </div>
        );
    }

    // 开始计时
    beginRecord() {
        this.setState(prevState => ({
            record: Object.assign({}, prevState.record, {
                beginTime: Date.now()
            })
        }), () => {
            this.timer = setInterval(() => {
                this.setState(prevState => ({
                    record: Object.assign({}, prevState.record, {
                        recordTime: Date.now() - prevState.record.beginTime
                    })
                }));
            }, 200);
        })
        
    }

    // 停止计时
    overRecord() {
        const record = Object.assign({}, this.state.record, {
            recordTime: Date.now() - this.state.record.beginTime,
            endTime: Date.now()
        });
        clearInterval(this.timer);
        this.timer = null;
        this.setState(prevState => ({
            record: {
                recordTime: null,
                beginTime: null,
                endTime: null,
            },
            records: prevState.records.concat(record)
        }));
    }

    //  数字 格式转换
    transToDate(count) {
        const min = Math.floor(count / (1000 * 60));
        const second = Number.parseInt( count % (1000 * 60) / 1000  );
        const msec = Number.parseInt(count % 1000);
        return `${min} 分 ${second}秒 ${msec}`;
    }

    componentWillMount() {
        // this.tick();
        console.log('componentWillMount');
    }


    componentWillUnmount() {
        clearInterval(this.timer);
        console.log('componentWillUnmount');
    }

}